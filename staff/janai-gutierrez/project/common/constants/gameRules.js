export const XP_RULES = {
    BASE_LEVELS: [
        0,     // Level 0 (placeholder)
        0,     // Level 1
        100,   // Level 2
        250,   // Level 3
        450,   // Level 4
        700,   // Level 5
        1000,  // Level 6
        1350,  // Level 7
        1750,  // Level 8
        2200,  // Level 9
        2700,  // Level 10
        3250,  // Level 11
        3850,  // Level 12
        4500,  // Level 13
        5200,  // Level 14
        6000,  // Level 15
        6850,  // Level 16
        7750,  // Level 17
        8700,  // Level 18
        9700,  // Level 19
        10750  // Level 20
    ],

    INFINITE_PROGRESSION: {
        START_LEVEL: 20,
        BASE_INCREMENT: 1200,
        INCREMENT_GROWTH: 100
    },

    getXPForLevel(level) {
        if (level <= 20) {
            return this.BASE_LEVELS[level] || 0
        }

        let totalXP = this.BASE_LEVELS[20]

        for (let currentLevel = 21; currentLevel <= level; currentLevel++) {
            const levelDiff = currentLevel - this.INFINITE_PROGRESSION.START_LEVEL
            const xpForThisLevel = this.INFINITE_PROGRESSION.BASE_INCREMENT +
                (levelDiff * this.INFINITE_PROGRESSION.INCREMENT_GROWTH)
            totalXP += xpForThisLevel
        }

        return totalXP
    },

    getLevelFromXP(xp) {
        for (let i = this.BASE_LEVELS.length - 1; i >= 1; i--) {
            if (xp >= this.BASE_LEVELS[i]) {
                if (i === 20) {
                    return this.calculateInfiniteLevel(xp)
                }
                return i
            }
        }
        return 1
    },

    calculateInfiniteLevel(xp) {
        let currentLevel = 20
        let currentXP = this.BASE_LEVELS[20]

        while (currentXP < xp) {
            currentLevel++
            const levelDiff = currentLevel - this.INFINITE_PROGRESSION.START_LEVEL
            const xpForNextLevel = this.INFINITE_PROGRESSION.BASE_INCREMENT +
                (levelDiff * this.INFINITE_PROGRESSION.INCREMENT_GROWTH)

            if (currentXP + xpForNextLevel > xp) {
                return currentLevel - 1
            }

            currentXP += xpForNextLevel
        }

        return currentLevel
    },

    getXPToNextLevel(xp) {
        const currentLevel = this.getLevelFromXP(xp)
        const nextLevel = currentLevel + 1
        const xpForNextLevel = this.getXPForLevel(nextLevel)

        return xpForNextLevel - xp
    },

    getXPForLevelUp(currentLevel) {
        if (currentLevel < 20) {
            return this.BASE_LEVELS[currentLevel + 1] - this.BASE_LEVELS[currentLevel]
        } else {
            const levelDiff = (currentLevel + 1) - this.INFINITE_PROGRESSION.START_LEVEL
            return this.INFINITE_PROGRESSION.BASE_INCREMENT +
                (levelDiff * this.INFINITE_PROGRESSION.INCREMENT_GROWTH)
        }
    }
}

export const QUEST_REWARDS = {
    BASE_XP: {
        QUICK: 25,      // <30 min
        STANDARD: 50,   // 30min-2h
        LONG: 100,      // 2+ hours
        EPIC: 200       // Multi-day
    },

    DAILY_MULTIPLIER: 1.2,  // +20% for daily quests
    STAT_BONUS: 10,          // +10 XP for specific stat

    calculateQuestXP(baseXP, isDaily = false, targetStat = null) {
        let totalXP = baseXP

        if (isDaily) {
            totalXP = Math.floor(totalXP * this.DAILY_MULTIPLIER)
        }

        if (targetStat) {
            totalXP += this.STAT_BONUS
        }

        return totalXP
    }
}

// ===== STAT RULES =====
export const STAT_RULES = {
    STAT_POINTS_PER_QUEST: 25,

    STATS: {
        STRENGTH: {
            name: 'Strength',
            emoji: '💪',
            color: 'red',
            keywords: [
                'gym', 'exercise', 'workout', 'fitness', 'run', 'running', 'jog', 'jogging',
                'lift', 'lifting', 'weights', 'cardio', 'sport', 'sports', 'train', 'training',
                'muscle', 'strength', 'strong', 'physical', 'body', 'health', 'healthy'
            ]
        },
        DEXTERITY: {
            name: 'Dexterity',
            emoji: '🎯',
            color: 'green',
            keywords: [
                'art', 'draw', 'drawing', 'paint', 'painting', 'craft', 'crafting', 'create',
                'music', 'instrument', 'play', 'guitar', 'piano', 'sing', 'singing',
                'cook', 'cooking', 'recipe', 'kitchen', 'bake', 'baking', 'skill', 'practice',
                'hand', 'finger', 'precise', 'precision', 'fine', 'motor', 'dexterity'
            ]
        },
        WISDOM: {
            name: 'Wisdom',
            emoji: '🧠',
            color: 'blue',
            keywords: [
                'study', 'learn', 'learning', 'read', 'reading', 'book', 'books', 'research',
                'school', 'university', 'course', 'class', 'lesson', 'education', 'knowledge',
                'think', 'thinking', 'analyze', 'understand', 'memory', 'brain', 'mind',
                'code', 'coding', 'program', 'programming', 'develop', 'software', 'tech'
            ]
        },
        CHARISMA: {
            name: 'Charisma',
            emoji: '✨',
            color: 'purple',
            keywords: [
                'talk', 'talking', 'speak', 'speaking', 'conversation', 'social', 'people',
                'friend', 'friends', 'family', 'call', 'phone', 'meeting', 'presentation',
                'lead', 'leadership', 'team', 'group', 'communicate', 'network', 'networking',
                'charisma', 'charm', 'influence', 'persuade', 'connect', 'relationship'
            ]
        }
    },

    detectStatFromDescription(text) {
        const words = text.toLowerCase().split(/\s+/)
        const statCounts = {}

        for (const [stat, config] of Object.entries(this.STATS)) {
            statCounts[stat] = 0
            for (const keyword of config.keywords) {
                if (words.some(word => word.includes(keyword) || keyword.includes(word))) {
                    statCounts[stat]++
                }
            }
        }

        const maxCount = Math.max(...Object.values(statCounts))
        if (maxCount === 0) return null

        return Object.keys(statCounts).find(stat => statCounts[stat] === maxCount)
    },

    getStatLevel(statPoints) {
        return Math.floor(statPoints / this.STAT_POINTS_PER_QUEST) + 1
    }
}

// ===== UNLOCK RULES =====
export const UNLOCK_RULES = {
    GLOBAL_UNLOCKS: {
        1: ['DARK_MODE', 'LIBRARY_THEME'],
        2: ['STREAK_COUNTER', 'MYSTIC_THEME'],
        3: ['AI_QUEST_GENERATION', 'MOTIVATIONAL_QUOTES'],
        4: ['BASIC_ANALYTICS', 'CALENDAR_VIEW'],
        5: ['VOICE_TO_TEXT', 'ADVANCED_FILTERS'],
        6: ['QUEST_TEMPLATES', 'MEDIEVAL_THEME'],
        7: ['QUICK_ADD_BUTTONS', 'BASIC_AVATAR'],
        8: ['RANDOM_GENERATOR', 'DAILY_NOTIFICATIONS'],
        9: ['ADVANCED_ANALYTICS', 'ACHIEVEMENT_SYSTEM'],
        10: ['WEEKLY_CHALLENGES', 'WARRIOR_THEME'],
        11: ['FULL_AVATAR_SYSTEM', 'ACADEMY_THEME'],
        12: ['EXPORT_DATA', 'SOCIAL_FEATURES']
    },

    FEATURE_INFO: {
        DARK_MODE: {
            name: 'Dark Mode',
            emoji: '🌙',
            description: 'Switch to dark theme for comfortable viewing'
        },
        LIBRARY_THEME: {
            name: 'Library Theme',
            emoji: '📚',
            description: 'Scholarly theme with warm, bookish aesthetics'
        },
        STREAK_COUNTER: {
            name: 'Streak Counter',
            emoji: '🔥',
            description: 'Track your daily quest completion streaks'
        },
        MYSTIC_THEME: {
            name: 'Mystic Theme',
            emoji: '🌙',
            description: 'Mystical theme with magical, ethereal design'
        },
        AI_QUEST_GENERATION: {
            name: 'AI Quest Generation',
            emoji: '🤖',
            description: 'Let AI transform your tasks into epic quests'
        },
        MOTIVATIONAL_QUOTES: {
            name: 'Motivational Quotes',
            emoji: '💬',
            description: 'Daily inspiring quotes to keep you motivated'
        },
        BASIC_ANALYTICS: {
            name: 'Basic Analytics',
            emoji: '📊',
            description: 'View your quest completion statistics'
        },
        CALENDAR_VIEW: {
            name: 'Calendar View',
            emoji: '📅',
            description: 'Organize quests in a visual calendar layout'
        },
        VOICE_TO_TEXT: {
            name: 'Voice Input',
            emoji: '🎵',
            description: 'Create quests using voice commands'
        },
        ADVANCED_FILTERS: {
            name: 'Advanced Filters',
            emoji: '🎯',
            description: 'Filter and sort quests with advanced options'
        },
        QUEST_TEMPLATES: {
            name: 'Quest Templates',
            emoji: '📝',
            description: 'Use pre-made templates for common quest types'
        },
        MEDIEVAL_THEME: {
            name: 'Medieval Theme',
            emoji: '🏰',
            description: 'Medieval fantasy theme with castle aesthetics'
        },
        QUICK_ADD_BUTTONS: {
            name: 'Quick Add',
            emoji: '⚡',
            description: 'Quickly add quests with predefined buttons'
        },
        BASIC_AVATAR: {
            name: 'Basic Avatar',
            emoji: '👤',
            description: 'Customize your basic avatar appearance'
        },
        RANDOM_GENERATOR: {
            name: 'Random Quest Generator',
            emoji: '🎲',
            description: 'Generate random quest suggestions'
        },
        DAILY_NOTIFICATIONS: {
            name: 'Daily Notifications',
            emoji: '📱',
            description: 'Get reminders for your daily quests'
        },
        ADVANCED_ANALYTICS: {
            name: 'Advanced Analytics',
            emoji: '📈',
            description: 'Detailed charts and progress analysis'
        },
        ACHIEVEMENT_SYSTEM: {
            name: 'Achievement Badges',
            emoji: '🏆',
            description: 'Earn badges for completing milestones'
        },
        WEEKLY_CHALLENGES: {
            name: 'Weekly Challenges',
            emoji: '📊',
            description: 'Participate in weekly quest challenges'
        },
        WARRIOR_THEME: {
            name: 'Warrior Theme',
            emoji: '⚔️',
            description: 'Battle-ready theme for true warriors'
        },
        FULL_AVATAR_SYSTEM: {
            name: 'Full Avatar System',
            emoji: '👤',
            description: 'Complete avatar customization with items'
        },
        ACADEMY_THEME: {
            name: 'Academy Theme',
            emoji: '🏛️',
            description: 'Academic theme for scholarly adventurers'
        },
        EXPORT_DATA: {
            name: 'Export Data',
            emoji: '📤',
            description: 'Export your quest data and statistics'
        },
        SOCIAL_FEATURES: {
            name: 'Social Features',
            emoji: '🎮',
            description: 'Share achievements and compete with friends'
        }
    },

    STAT_UNLOCKS: {
        STRENGTH: {
            3: { type: 'title', value: 'Athlete', emoji: '🏃' },
            7: { type: 'head', value: 'fitness_headband', emoji: '💪' },
            12: { type: 'body', value: 'gym_outfit', emoji: '🏋️' },
            18: { type: 'weapon', value: 'dumbbells', emoji: '🏋️‍♂️' }
        },
        DEXTERITY: {
            3: { type: 'title', value: 'Artisan', emoji: '🎨' },
            7: { type: 'head', value: 'artist_beret', emoji: '🎭' },
            12: { type: 'accessory', value: 'paint_palette', emoji: '🎨' },
            18: { type: 'weapon', value: 'magic_brush', emoji: '🖌️' }
        },
        WISDOM: {
            3: { type: 'title', value: 'Scholar', emoji: '📚' },
            7: { type: 'head', value: 'graduation_cap', emoji: '🎓' },
            12: { type: 'accessory', value: 'ancient_tome', emoji: '📜' },
            18: { type: 'weapon', value: 'staff_of_knowledge', emoji: '🔮' }
        },
        CHARISMA: {
            3: { type: 'title', value: 'Charmer', emoji: '✨' },
            7: { type: 'head', value: 'crown', emoji: '👑' },
            12: { type: 'body', value: 'royal_robes', emoji: '👗' },
            18: { type: 'weapon', value: 'golden_scepter', emoji: '🪄' }
        }
    },

    isGlobalUnlocked(featureName, userLevel) {
        for (const [level, features] of Object.entries(this.GLOBAL_UNLOCKS)) {
            if (features.includes(featureName)) {
                return userLevel >= parseInt(level)
            }
        }
        return false
    },

    getUnlocksForLevel(level) {
        return this.GLOBAL_UNLOCKS[level] || []
    },

    getAllAvailableUnlocks(userLevel, userStats) {
        const availableUnlocks = {
            global: [],
            stats: {}
        }

        for (const [level, features] of Object.entries(this.GLOBAL_UNLOCKS)) {
            if (userLevel >= parseInt(level)) {
                availableUnlocks.global.push(...features)
            }
        }

        for (const [stat, unlocks] of Object.entries(this.STAT_UNLOCKS)) {
            const statLevel = STAT_RULES.getStatLevel(userStats[stat] || 0)
            availableUnlocks.stats[stat] = []

            for (const [requiredLevel, unlock] of Object.entries(unlocks)) {
                if (statLevel >= parseInt(requiredLevel)) {
                    availableUnlocks.stats[stat].push(unlock)
                }
            }
        }

        return availableUnlocks
    },

    getNextGlobalUnlocks(userLevel, count = 3) {
        const nextUnlocks = []

        for (const [level, features] of Object.entries(this.GLOBAL_UNLOCKS)) {
            if (parseInt(level) > userLevel) {
                nextUnlocks.push({
                    level: parseInt(level),
                    features: features.map(feature => ({
                        name: feature,
                        info: this.FEATURE_INFO[feature]
                    }))
                })

                if (nextUnlocks.length >= count) break
            }
        }

        return nextUnlocks
    }
}

// ===== VALIDATION RULES =====
export const VALIDATION_RULES = {
    QUEST: {
        TITLE_MIN_LENGTH: 3,
        TITLE_MAX_LENGTH: 100,
        DESCRIPTION_MAX_LENGTH: 500,
        MIN_XP: 10,
        MAX_XP: 500
    },
    USER: {
        USERNAME_MIN_LENGTH: 3,
        USERNAME_MAX_LENGTH: 20,
        PASSWORD_MIN_LENGTH: 6
    }
}

export default {
    XP_RULES,
    QUEST_REWARDS,
    STAT_RULES,
    UNLOCK_RULES,
    VALIDATION_RULES
}