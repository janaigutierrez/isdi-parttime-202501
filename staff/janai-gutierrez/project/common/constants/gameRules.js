export const XP_RULES = {

    // XP required for each level (until level 20)
    LEVELS: [
        0,
        100,    // Level 1
        250,    // Level 2
        450,    // Level 3
        700,    // Level 4
        1000,   // Level 5
        1400,   // Level 6
        1900,   // Level 7
        2500,   // Level 8
        3200,   // Level 9
        4000,   // Level 10
        4900,   // Level 11
        5900,   // Level 12
        7000,   // Level 13
        8200,   // Level 14
        9500,   // Level 15
        11000,   // Level 16
        12600,   // Level 17
        14300,   // Level 18
        16100,   // Level 19
        18000    // Level 20
    ],

    // Function to calculate XP required for any level
    getXPForLevel(level) {
        if (level <= 20) {
            return this.LEVELS[level] || 0
        }
        // After level 20: 2000 Xp per level

        return 18000 + ((level - 20) * 2000)
    },

    // Function to calculate current level based on XP
    getLevelFromXP(totalXP) {// Searching pn first 20 levels
        for (let i = this.LEVELS.length - 1; i >= 0; i--) {
            if (totalXP >= this.LEVELS[i]) {
                return i;
            }
        }

        // If XP is higher than level 20
        if (totalXP >= 18000) {
            return 20 + Math.floor((totalXP - 18000) / 2000)
        }
        return 0
    },

    // XP required for next level
    getXPToNextLevel(currentXP) {
        const currentLevel = this.getLevelFromXP(currentXP)
        const nextLevelXP = this.getXPForLevel(currentLevel + 1)
        return nextLevelXP - currentXP
    }
};

export const QUEST_REWARDS = {
    // Base XP for type of task
    BASE_XP: {
        QUICK: 25,  //<30min (reading, meditating)
        STANDARD: 50,   // 30min-2h (gym, studying)
        LONG: 100,  //<2h (project or long hike)
        EPIC: 200   //Multi-day (learning new skill)
    },

    // Multiplier per type
    TYPE_MULTIPLIERS: {
        CASUAL: 1.2,    // Unique events
        DAILY: 1.0      // Daily tasks
    },

    // Bonus per specific stat
    STAT_BONUS: 10, // +10 XP for certain stat

    //Function to calculate total XP for a quest
    calculateQuestXP(baseXP, isDaily, targetStat) {
        let totalXP = baseXP;

        //Apply multiplier type
        if (isDaily) {
            totalXP *= this.TYPE_MULTIPLIERS.DAILY
        }

        // Add bonus stat
        if (targetStat) {
            totalXP += this.STAT_BONUS
        }

        return Math.floor(totalXP)
    }
};

export const STAT_RULES = {
    // Added emojis for debugging and visual representation
    STATS: {
        STRENGTH: {
            name: 'Strength',
            emoji: '💪',
            icon: 'Zap',
            description: 'Physical power and endurance',
            color: '#ef4444', //red
            keywords: ['gym', 'ejercicio', 'deporte', 'entrenar', 'correr', 'fitness', 'nadar', 'yoga', 'boxeo', 'fuerza', 'pesas']
        },
        DEXTERITY: {
            name: 'Dexterity',
            emoji: '🎯',
            icon: 'Target',
            description: 'Skill, precision and creativity',
            color: '#10b981', // emerald
            keywords: ['dibujar', 'tocar', 'cocinar', 'arte', 'manualidades', 'precisión', 'música', 'piano', 'guitarra', 'bailar', 'pintar', 'escribir']
        },
        WISDOM: {
            name: 'Wisdom',
            emoji: '🧠',
            icon: 'Brain',
            description: 'Knowledge and learning',
            color: '#3b82f6', // blue
            keywords: ['pensar', 'estudiar', 'leer', 'aprender', 'investigar', 'libro', 'documental', 'idiomas', 'programar', 'ciencia', 'filosofia', 'historia']
        },
        CHARISMA: {
            name: 'Charisma',
            emoji: '✨',
            icon: 'Star',
            description: 'Social skills and communication',
            color: '#8b5cf6', // purple
            keywords: ['hablar', 'conversar', 'escuchar', 'relaciones', 'amistad', 'comunicación', 'social', 'público', 'entrevista', 'amigos']
        }
    },

    // Initial stats for new users
    INITIAL_STATS: {
        STRENGTH: 0,
        DEXTERITY: 0,
        WISDOM: 0,
        CHARISMA: 0
    },

    // Levels system per stat
    STAT_LEVELS: [
        0, 50, 150, 300, 500, 750, 1050, 1400, 1800, 2250, 2750, // Levels 0-10
        3300, 3900, 4550, 5250, 6000, 6800, 7650, 8550, 9500, 10500 // Levels 11-20
    ],
    STAT_POINTS_PER_QUEST: 25,

    // Function to calculate stat level based on XP
    getStatLevel(statPoints) {
        for (let i = this.STAT_LEVELS.length - 1; i >= 0; i--) {
            if (statPoints >= this.STAT_LEVELS[i]) {
                return i
            }
        }
        return 0
    },

    //Function to calculate next stat level
    getPointsToNextStatLevel(currentPoints) {
        const currentLevel = this.getStatLevel(currentPoints)
        if (currentLevel >= this.STAT_LEVELS.length - 1) {
            return 0    // Max level reached
        }
        const nextLevelPoints = this.STAT_LEVELS[currentLevel + 1]
        return nextLevelPoints - currentPoints
    },

    // Detect stat automatically from keywords
    detectStatFromDescription(description) {
        const text = description.toLowerCase()

        for (const [statName, statData] of Object.entries(this.STATS)) {
            for (const keyword of statData.keywords) {
                if (text.includes(keyword)) {
                    return statName
                }
            }
        }
        return null // No stat detected
    }
};

export const UNLOCK_RULES = {

    // Global unlocks per XP
    GLOBAL_UNLOCKS: {

        DARK_MODE: 1,                    // Theme
        MOTIVATIONAL_QUOTES: 2,          // Feature
        AI_QUEST_GENERATION: 3,          // Feature
        LIBRARY_THEME: 4,                // Theme
        STREAK_COUNTER: 5,               // Feature
        MYSTIC_THEME: 6,                 // Theme
        WEEKLY_CHALLENGES: 7,            // Feature
        MEDIEVAL_THEME: 8,               // Theme
        QUICK_ADD: 9,                    // Feature
        WARRIOR_THEME: 10,               // Theme
        RANDOM_QUEST_GENERATOR: 11,      // Feature
        ACADEMY_THEME: 12                // Theme
    },

    // Unlocks per stat level
    STAT_UNLOCKS: {
        STRENGTH: {
            // Title
            ATHLETE: { level: 3, type: 'title', name: 'Athlete' },
            WARRIOR: { level: 7, type: 'title', name: 'Warrior' },
            CHAMPION: { level: 12, type: 'title', name: 'Champion' },
            LEGEND: { level: 18, type: 'title', name: 'Muscle Legend' },

            // Avatar items
            BOXING_GLOVES: { level: 5, type: 'accessory', name: 'Boxing Gloves' },
            WARRIOR_ARMOR: { level: 10, type: 'outfit', name: 'Warrior Armor' },
            CHAMPION_BELT: { level: 15, type: 'accessory', name: 'Champion Belt' },
            LEGENDARY_SWORD: { level: 20, type: 'weapon', name: 'Legendary Sword' }
        },

        DEXTERITY: {
            // Title
            ARTIST: { level: 3, type: 'title', name: 'Artist' },
            CRAFTSMAN: { level: 7, type: 'title', name: 'Craftsman' },
            MASTER_CREATOR: { level: 12, type: 'title', name: 'Master Creator' },
            VIRTUOSO: { level: 18, type: 'title', name: 'Virtuoso' },

            // Avatar items
            ARTIST_PALETTE: { level: 5, type: 'accessory', name: 'Artist Palette' },
            CRAFTSMAN_TOOLS: { level: 10, type: 'accessory', name: 'Craftsman Tools' },
            MAGIC_BRUSH: { level: 15, type: 'weapon', name: 'Magic Brush' },
            CREATORS_CLOAK: { level: 20, type: 'outfit', name: 'Creators Cloak' }
        },

        WISDOM: {
            // Title
            SCHOLAR: { level: 3, type: 'title', name: 'Scholar' },
            SAGE: { level: 7, type: 'title', name: 'Sage' },
            PROFESSOR: { level: 12, type: 'title', name: 'Professor' },
            GRAND_MASTER: { level: 18, type: 'title', name: 'Grand Master' },

            // Avatar items
            READING_GLASSES: { level: 5, type: 'accessory', name: 'Reading Glasses' },
            SCHOLARS_ROBE: { level: 10, type: 'outfit', name: 'Scholars Robe' },
            WISDOM_STAFF: { level: 15, type: 'weapon', name: 'Staff of Wisdom' },
            PHOENIX_FEATHER: { level: 20, type: 'accessory', name: 'Phoenix Feather' }
        },

        CHARISMA: {
            // Title
            SPEAKER: { level: 3, type: 'title', name: 'Public Speaker' },
            LEADER: { level: 7, type: 'title', name: 'Natural Leader' },
            INFLUENCER: { level: 12, type: 'title', name: 'Influencer' },
            LEGEND: { level: 18, type: 'title', name: 'Social Legend' },

            // Avatar items
            GOLDEN_MICROPHONE: { level: 5, type: 'accessory', name: 'Golden Microphone' },
            LEADERS_CAPE: { level: 10, type: 'outfit', name: 'Leaders Cape' },
            CROWN_OF_INFLUENCE: { level: 15, type: 'accessory', name: 'Crown of Influence' },
            GOLDEN_CROWN: { level: 20, type: 'head', name: 'Golden Crown' }
        }
    },

    // Verify if unlock is available
    isGlobalUnlocked(item, userLevel) {
        const requiredLevel = this.GLOBAL_UNLOCKS[item]
        return userLevel >= (requiredLevel || 0)
    },

    isStatUnlocked(stat, item, statLevel) {
        const unlock = this.STAT_UNLOCKS[stat]?.[item]
        return unlock && statLevel >= unlock.level
    },

    // Get next global unlocks
    getNextGlobalUnlocks(userLevel) {
        const nextUnlocks = []

        for (const [item, requiredLevel] of Object.entries(this.GLOBAL_UNLOCKS)) {
            if (requiredLevel > userLevel && requiredLevel <= userLevel + 5) {
                nextUnlocks.push({
                    item,
                    requiredLevel,
                    type: 'global',
                    name: item.replace(/_/g, ' ').toLowerCase()
                })
            }
        }

        return nextUnlocks.sort((a, b) => a.requiredLevel - b.requiredLevel)
    },

    // Get next unlocks per stat
    getNextStatUnlocks(stat, statLevel) {
        const statUnlocks = this.STAT_UNLOCKS[stat] || {}
        const nextUnlocks = []

        for (const [item, unlock] of Object.entries(statUnlocks)) {
            if (unlock.level > statLevel && unlock.level <= statLevel + 3) {
                nextUnlocks.push({
                    item,
                    requiredLevel: unlock.level,
                    type: unlock.type,
                    name: unlock.name,
                    stat: stat
                });
            }
        }
        return nextUnlocks.sort((a, b) => a.requiredLevel - b.requiredLevel)

    },

    // Get all available stat unlocks
    getAllAvailableUnlocks(userLevel, userStats) {
        const globalUnlocks = this.getNextGlobalUnlocks(userLevel)
        const statUnlocks = []

        for (const [statName, statPoints] of Object.entries(userStats)) {
            const statLevel = STAT_RULES.getStatLevel(statPoints)
            const unlocks = this.getNextStatUnlocks(statName, statLevel)
            statUnlocks.push(...unlocks)
        }

        return {
            global: globalUnlocks,
            stats: statUnlocks,
            total: globalUnlocks.length + statUnlocks.length
        }
    }
};

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
        PASSWORD_MIN_LENGTH: 6,
        MAX_LEVEL: 100,
        MAX_XP: 200000
    }
};

// Function for testing

export const GameUtils = {
    // Simulate user progress
    simulateUsersProgress(quests) {
        let totalXP = 0
        const stats = { ...STAT_RULES.INITIAL_STATS }

        quests.forEach(quest => {
            totalXP += quest.experienceReward
            if (quest.targetStat) {
                stats[quest.targetStat] += STAT_RULES.STAT_POINTS_PER_QUEST
            }
        });

        const level = XP_RULES.getLevelFromXP(totalXP)
        return { totalXP, level, stats }
    },

    // Generating example quest
    generateSampleQuest(title, isDaily = false, difficulty = 'STANDARD') {
        const baseXP = QUEST_REWARDS.BASE_XP[difficulty]
        const experienceReward = QUEST_REWARDS.calculateQuestXP(baseXP, isDaily)

        return {
            title,
            isDaily,
            experienceReward,
            difficulty
        }
    }
}