import Quest from '../models/quest.js'
import { AIService } from '../utils/aiService/index.js'
import { QUEST_REWARDS } from '../../common/constants/gameRules.js'

/**
 * Create a new quest for a user (AI or Manual)
 * @param {string} userId - User ID from JWT
 * @param {Object} questData - Quest creation data
 * @returns {Object} Created quest
 */

export const createQuest = async (userId, questData) => {
    const { title, useAI, difficulty = 'STANDARD' } = questData

    if (!title || !title.trim()) {
        throw new Error('Quest title is required')
    }

    if (!userId) {
        throw new Error('User ID is required')
    }

    let questInfo

    if (useAI) {
        questInfo = await AIService.generateQuest(title, null, difficulty)
    } else {
        questInfo = {
            title: title.trim(),
            description: '',
            difficulty,
            experienceReward: QUEST_REWARDS.BASE_XP[difficulty] || 50,
            targetStat: null,
            generatedBy: 'user',
            tags: [],
            epicElements: null,
            aiMetadata: null
        }

        questInfo = AIService.enhanceManualQuest(questInfo)
    }

    const quest = new Quest({
        ...questInfo,
        userId,
        isCompleted: false,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
    })

    try {
        await quest.save()
        return quest
    } catch (error) {
        throw new Error('Failed to save quest to database')
    }
}

export default createQuest