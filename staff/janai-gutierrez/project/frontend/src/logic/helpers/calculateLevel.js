import { XP_RULES, STAT_RULES } from '../../common/constants/gameRules.js'

/**
 * Calculate user level from total XP
 * @param {number} totalXP - User's total experience points
 * @returns {number} Current level
 */

export const calculateLevel = (totalXP) => {
    try {
        return XP_RULES.getLevelFromXP(totalXP)
    } catch (error) {
        console.error('Error calculating level:', error)
        return Math.max(1, Math.floor(totalXP / 200) + 1)
    }
}

/**
 * Calculate XP needed to reach next level
 * @param {number} totalXP - User's current total XP
 * @returns {number} XP needed for next level
 */

export const calculateXPToNextLevel = (totalXP) => {
    try {
        return XP_RULES.getXPToNextLevel(totalXP)
    } catch (error) {
        console.error('Error calculating XP to next level:', error)
        const currentLevel = calculateLevel(totalXP)
        const nextLevelXP = currentLevel * 200
        return Math.max(0, nextLevelXP - totalXP)
    }
}

/**
 * Calculate XP required for a specific level
 * @param {number} level - Target level
 * @returns {number} Total XP required for that level
 */

export const calculateXPForLevel = (level) => {
    try {
        return XP_RULES.getXPRequiredForLevel(level)
    } catch (error) {
        console.error('Error calculating XP for level:', error)
        return (level - 1) * 200
    }
}

/**
 * Calculate stat level from stat points
 * @param {number} statPoints - Points in a specific stat
 * @returns {number} Stat level
 */

export const calculateStatLevel = (statPoints) => {
    try {
        return STAT_RULES.getStatLevel(statPoints)
    } catch (error) {
        console.error('Error calculating stat level:', error)
        return Math.max(1, Math.floor(statPoints / 25) + 1)
    }
}

/**
 * Calculate total XP from completed quests
 * @param {Array} quests - Array of quest objects
 * @returns {number} Total XP from completed quests
 */

export const calculateTotalXPFromQuests = (quests) => {
    if (!Array.isArray(quests)) {
        console.warn('calculateTotalXPFromQuests: quests is not an array')
        return 0
    }

    return quests
        .filter(quest => quest.completed)
        .reduce((total, quest) => {
            const xp = quest.experienceReward || 0
            return total + xp
        }, 0)
}

/**
 * Check if user leveled up after gaining XP
 * @param {number} oldXP - Previous total XP
 * @param {number} newXP - New total XP after quest completion
 * @returns {Object} { leveled: boolean, oldLevel: number, newLevel: number }
 */

export const checkLevelUp = (oldXP, newXP) => {
    const oldLevel = calculateLevel(oldXP)
    const newLevel = calculateLevel(newXP)

    return {
        leveled: newLevel > oldLevel,
        oldLevel,
        newLevel,
        levelsGained: newLevel - oldLevel
    }
}

/**
 * Calculate completion percentage for current level
 * @param {number} totalXP - User's current total XP
 * @returns {number} Percentage (0-100) of progress through current level
 */

export const calculateLevelProgress = (totalXP) => {
    try {
        const currentLevel = calculateLevel(totalXP)
        const currentLevelXP = calculateXPForLevel(currentLevel)
        const nextLevelXP = calculateXPForLevel(currentLevel + 1)
        const progressXP = totalXP - currentLevelXP
        const levelXPRange = nextLevelXP - currentLevelXP

        return Math.round((progressXP / levelXPRange) * 100)
    } catch (error) {
        console.error('Error calculating level progress:', error)
        return 0
    }
}

/**
 * Calculate stat progress for a specific stat
 * @param {number} statPoints - Current points in the stat
 * @returns {Object} { level, progress, pointsToNext }
 */

export const calculateStatProgress = (statPoints) => {
    const level = calculateStatLevel(statPoints)
    const currentLevelPoints = (level - 1) * 25
    const nextLevelPoints = level * 25
    const progress = statPoints - currentLevelPoints
    const pointsToNext = nextLevelPoints - statPoints

    return {
        level,
        progress,
        pointsToNext,
        progressPercentage: Math.round((progress / 25) * 100)
    }
}

/**
 * Get user's overall stats summary
 * @param {Object} user - User object with totalXP and stats
 * @returns {Object} Complete stats summary
 */

export const getUserStatsSummary = (user) => {
    if (!user) {
        console.warn('getUserStatsSummary: user object is required')
        return null
    }

    const { totalXP = 0, stats = {} } = user

    return {
        level: calculateLevel(totalXP),
        totalXP,
        xpToNextLevel: calculateXPToNextLevel(totalXP),
        levelProgress: calculateLevelProgress(totalXP),
        stats: {
            STRENGTH: calculateStatProgress(stats.STRENGTH || 0),
            DEXTERITY: calculateStatProgress(stats.DEXTERITY || 0),
            WISDOM: calculateStatProgress(stats.WISDOM || 0),
            CHARISMA: calculateStatProgress(stats.CHARISMA || 0)
        }
    }
}

/**
 * Validate XP value
 * @param {number} xp - XP value to validate
 * @returns {boolean} True if valid XP value
 */

export const isValidXP = (xp) => {
    return typeof xp === 'number' && xp >= 0 && xp <= 999999 && !isNaN(xp)
}

/**
 * Validate level value
 * @param {number} level - Level value to validate
 * @returns {boolean} True if valid level value
 */

export const isValidLevel = (level) => {
    return typeof level === 'number' && level >= 1 && level <= 999 && Number.isInteger(level)
}