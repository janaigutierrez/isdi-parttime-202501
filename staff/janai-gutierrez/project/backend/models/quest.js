import mongoose from 'mongoose'
import { STAT_RULES, QUEST_REWARDS, VALIDATION_RULES } from '../../common/constants/gameRules.js'

const questSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Quest title is required'],
        trim: true,
        minlength: [VALIDATION_RULES.QUEST.TITLE_MIN_LENGTH, `Title must be at least ${VALIDATION_RULES.QUEST.TITLE_MIN_LENGTH} characters`],
        maxlength: [VALIDATION_RULES.QUEST.TITLE_MAX_LENGTH, `Title must be less than ${VALIDATION_RULES.QUEST.TITLE_MAX_LENGTH} characters`]
    },

    description: {
        type: String,
        trim: true,
        maxlength: [VALIDATION_RULES.QUEST.DESCRIPTION_MAX_LENGTH, `Description must be less than ${VALIDATION_RULES.QUEST.DESCRIPTION_MAX_LENGTH} characters`],
        default: ''
    },

    isDaily: {
        type: Boolean,
        default: false,
        required: true
    },

    difficulty: {
        type: String,
        enum: ['QUICK', 'STANDARD', 'LONG', 'EPIC'],
        default: 'STANDARD',
        required: true
    },

    experienceReward: {
        type: Number,
        required: [true, 'Experience reward is required'],
        min: [VALIDATION_RULES.QUEST.MIN_XP, `XP must be at least ${VALIDATION_RULES.QUEST.MIN_XP}`],
        max: [VALIDATION_RULES.QUEST.MAX_XP, `XP cannot exceed ${VALIDATION_RULES.QUEST.MAX_XP}`]
    },

    targetStat: {
        type: String,
        enum: ['STRENGTH', 'DEXTERITY', 'WISDOM', 'CHARISMA'],
        default: null
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },

    isCompleted: {
        type: Boolean,
        default: false
    },

    completedAt: {
        type: Date,
        default: null
    },

    scheduledDate: {
        type: Date,
        default: null
    },

    generatedBy: {
        type: String,
        enum: ['user', 'ai', 'template', 'quick_add'],
        default: 'user'
    },

    aiMetadata: {
        prompt: String,
        model: String,
        generatedAt: Date
    },

    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }]
}, {
    timestamps: true
})

questSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('difficulty') || this.isModified('isDaily') || this.isModified('targetStat')) {
        const baseXP = QUEST_REWARDS.BASE_XP[this.difficulty]
        this.experienceReward = QUEST_REWARDS.calculateQuestXP(baseXP, this.isDaily, this.targetStat)
    }
    next()
})

questSchema.pre('save', function (next) {
    if (this.isNew && !this.targetStat) {
        const text = `${this.title} ${this.description}`.toLowerCase()
        this.targetStat = STAT_RULES.detectStatFromDescription(text)
    }
    next()
})

questSchema.pre('save', function (next) {
    if (this.isModified('isCompleted') && this.isCompleted && !this.completedAt) {
        this.completedAt = new Date()
    }
    next()
})

questSchema.virtual('statInfo').get(function () {
    if (!this.targetStat) return null
    return STAT_RULES.STATS[this.targetStat]
})

questSchema.virtual('difficultyInfo').get(function () {
    return {
        name: this.difficulty,
        baseXP: QUEST_REWARDS.BASE_XP[this.difficulty],
        estimatedTime: {
            QUICK: '< 30 min',
            STANDARD: '30 min - 2h',
            LONG: '2+ hours',
            EPIC: 'Multi-day'
        }[this.difficulty]
    }
})

questSchema.virtual('isOverdue').get(function () {
    if (!this.isDaily || !this.scheduledDate || this.isCompleted) return false
    return new Date() > new Date(this.scheduledDate.getTime() + 24 * 60 * 60 * 1000) // +24 hours
})

questSchema.methods.complete = async function () {
    if (this.isCompleted) {
        throw new Error('Quest is already completed')
    }

    this.isCompleted = true
    this.completedAt = new Date()

    return await this.save()
}

questSchema.methods.updateXP = function (newXP) {
    if (newXP < VALIDATION_RULES.QUEST.MIN_XP || newXP > VALIDATION_RULES.QUEST.MAX_XP) {
        throw new Error(`XP must be between ${VALIDATION_RULES.QUEST.MIN_XP} and ${VALIDATION_RULES.QUEST.MAX_XP}`)
    }
    this.experienceReward = newXP
    return this.save()
}

questSchema.statics.getUserQuests = function (userId, options = {}) {
    const query = { userId }

    if (options.completed !== undefined) {
        query.isCompleted = options.completed
    }

    if (options.isDaily !== undefined) {
        query.isDaily = options.isDaily
    }

    if (options.targetStat) {
        query.targetStat = options.targetStat
    }

    let queryBuilder = this.find(query)

    if (options.limit) {
        queryBuilder = queryBuilder.limit(options.limit)
    }

    if (options.sortBy) {
        queryBuilder = queryBuilder.sort(options.sortBy)
    } else {
        queryBuilder = queryBuilder.sort({ createdAt: -1 })
    }

    return queryBuilder
}

questSchema.statics.getCompletedToday = function (userId) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return this.find({
        userId,
        isCompleted: true,
        completedAt: {
            $gte: today,
            $lt: tomorrow
        }
    })
}

questSchema.statics.getDailyQuestsForDate = function (userId, date = new Date()) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    return this.find({
        userId,
        isDaily: true,
        scheduledDate: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    })
}

questSchema.index({ userId: 1, isCompleted: 1 })
questSchema.index({ userId: 1, isDaily: 1 })
questSchema.index({ userId: 1, createdAt: -1 })
questSchema.index({ scheduledDate: 1 })
questSchema.index({ targetStat: 1 })

const Quest = mongoose.model('Quest', questSchema)

export default Quest