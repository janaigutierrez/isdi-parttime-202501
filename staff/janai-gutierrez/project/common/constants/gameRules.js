export const XP_RULES = {
    BASE_LEVELS: [0, 0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700],
    MAX_LEVEL: 10,

    getLevelFromXP(xp) {
        for (let i = this.BASE_LEVELS.length - 1; i >= 1; i--) {
            if (xp >= this.BASE_LEVELS[i]) {
                return i
            }
        }
        return 1
    },

    getXPToNextLevel(xp) {
        const currentLevel = this.getLevelFromXP(xp)
        if (currentLevel >= this.MAX_LEVEL) return 0
        return this.BASE_LEVELS[currentLevel + 1] - xp
    },

    isMaxLevel(level) {
        return level >= this.MAX_LEVEL
    }
}

export const QUEST_REWARDS = {
    BASE_XP: {
        QUICK: 25,      // <30 min
        STANDARD: 50,   // 30min-2h
        LONG: 100,      // 2+ hours
        EPIC: 200       // Multi-day
    }
}

export const STAT_RULES = {
    STAT_POINTS_PER_QUEST: 25,

    STATS: {
        STRENGTH: {
            name: 'Strength', emoji: '💪', color: 'red',
            keywords: ['gym', 'exercise', 'workout', 'fitness', 'run', 'sport', 'train', 'muscle', 'physical']
        },
        DEXTERITY: {
            name: 'Dexterity', emoji: '🎯', color: 'green',
            keywords: ['art', 'draw', 'paint', 'craft', 'music', 'instrument', 'cook', 'skill', 'creative']
        },
        WISDOM: {
            name: 'Wisdom', emoji: '🧠', color: 'blue',
            keywords: ['study', 'learn', 'read', 'book', 'research', 'education', 'think', 'code', 'program']
        },
        CHARISMA: {
            name: 'Charisma', emoji: '✨', color: 'purple',
            keywords: ['talk', 'social', 'people', 'friend', 'call', 'meeting', 'presentation', 'leadership']
        }
    },

    detectStatFromDescription(text) {
        const words = text.toLowerCase().split(/\s+/)
        const statCounts = {}

        for (const [stat, config] of Object.entries(this.STATS)) {
            statCounts[stat] = 0
            for (const keyword of config.keywords) {
                if (words.some(word => word.includes(keyword))) {
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

export const UNLOCK_RULES = {
    GLOBAL_UNLOCKS: {
        2: ['DARK_MODE'],
        3: ['AI_QUEST_GENERATION'],
        5: ['LIBRARY_THEME'],
        7: ['MYSTIC_THEME'],
        10: ['AVATAR_SETS', 'FINAL_TITLES']
    },

    THEMES: ['default', 'dark', 'library', 'mystic'],

    AVATAR_SETS: {
        STRENGTH: { name: 'Legendary Warrior', title: 'Muscle Legend', emoji: '⚔️' },
        DEXTERITY: { name: 'Master Artisan', title: 'Creative Genius', emoji: '🎨' },
        WISDOM: { name: 'Grand Scholar', title: 'Wisdom Keeper', emoji: '📚' },
        CHARISMA: { name: 'Supreme Leader', title: 'Social Master', emoji: '👑' }
    },

    isUnlocked(featureName, userLevel) {
        if (XP_RULES.isMaxLevel(userLevel)) return true

        for (const [level, features] of Object.entries(this.GLOBAL_UNLOCKS)) {
            if (features.includes(featureName) && userLevel >= parseInt(level)) {
                return true
            }
        }
        return false
    },

    getUnlockedFeatures(userLevel) {
        if (XP_RULES.isMaxLevel(userLevel)) {
            return ['DARK_MODE', 'AI_QUEST_GENERATION', 'LIBRARY_THEME', 'MYSTIC_THEME', 'AVATAR_SETS', 'FINAL_TITLES']
        }

        const unlocked = []
        for (const [level, features] of Object.entries(this.GLOBAL_UNLOCKS)) {
            if (userLevel >= parseInt(level)) {
                unlocked.push(...features)
            }
        }
        return unlocked
    },

    getAvailableThemes(userLevel) {
        const themes = ['default']
        if (this.isUnlocked('DARK_MODE', userLevel)) themes.push('dark')
        if (this.isUnlocked('LIBRARY_THEME', userLevel)) themes.push('library')
        if (this.isUnlocked('MYSTIC_THEME', userLevel)) themes.push('mystic')
        return themes
    },

    getNextUnlock(userLevel) {
        if (XP_RULES.isMaxLevel(userLevel)) return null

        for (const [level, features] of Object.entries(this.GLOBAL_UNLOCKS)) {
            if (parseInt(level) > userLevel) {
                return { level: parseInt(level), features }
            }
        }
        return null
    },

    getDominantStat(userStats) {
        const stats = ['STRENGTH', 'DEXTERITY', 'WISDOM', 'CHARISMA']
        let dominant = 'STRENGTH'
        let maxPoints = userStats.STRENGTH || 0

        stats.forEach(stat => {
            const points = userStats[stat] || 0
            if (points > maxPoints) {
                maxPoints = points
                dominant = stat
            }
        })
        return dominant
    },

    getMaxLevelRewards(userStats) {
        const dominantStat = this.getDominantStat(userStats)
        return {
            ...this.AVATAR_SETS[dominantStat],
            allFeaturesUnlocked: true
        }
    }
}

export default {
    XP_RULES,
    QUEST_REWARDS,
    STAT_RULES,
    UNLOCK_RULES
}