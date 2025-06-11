import Groq from 'groq-sdk'
import { STAT_RULES, QUEST_REWARDS } from '../../common/constants/gameRules.js'

let groq = null

function getGroqClient() {
    if (!groq) {
        if (!process.env.GROQ_API_KEY) {
            throw new Error('GROQ_API_KEY environment variable is missing')
        }
        groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    }
    return groq
}

const RPG_LORE = {
    STRENGTH: {
        realm: "Forge of Titans",
        locations: ["Iron Temple", "Warrior's Arena", "Dragon's Peak", "Gladiator Colosseum", "Thunder Mountain"],
        enemies: ["Laziness Beast", "Weakness Demon", "Couch Potato Ogre", "Procrastination Troll", "Fatigue Dragon"],
        weapons: ["Hammer of Determination", "Blade of Endurance", "Shield of Will", "Gauntlets of Power", "Boots of Swift Action"],
        actions: ["forge", "battle", "conquer", "triumph", "dominate", "crush", "overpower"],
        virtues: ["Might", "Strength", "Power", "Endurance", "Resilience"]
    },

    DEXTERITY: {
        realm: "Artisan's Domain",
        locations: ["Crystal Workshop", "Melody Hall", "Garden of Creation", "Studio of Wonders", "Craftsman's Sanctuary"],
        enemies: ["Clumsiness Sprite", "Chaos Imp", "Disorder Phantom", "Rust Wraith", "Entropy Elemental"],
        weapons: ["Brush of Mastery", "Strings of Harmony", "Tools of Precision", "Chisel of Perfection", "Needle of Grace"],
        actions: ["craft", "weave", "compose", "sculpt", "paint", "harmonize", "create"],
        virtues: ["Grace", "Skill", "Artistry", "Precision", "Elegance"]
    },

    WISDOM: {
        realm: "Mystic Archives",
        locations: ["Ancient Library", "Scholar's Tower", "Crystal Cave", "Observatory of Stars", "Temple of Knowledge"],
        enemies: ["Ignorance Shadow", "Confusion Demon", "Doubt Specter", "Mind Fog", "Logic Eater"],
        weapons: ["Staff of Understanding", "Tome of Wisdom", "Orb of Clarity", "Scroll of Truth", "Crown of Intelligence"],
        actions: ["unravel", "decipher", "master", "illuminate", "discover", "comprehend", "analyze"],
        virtues: ["Wisdom", "Knowledge", "Understanding", "Insight", "Enlightenment"]
    },

    CHARISMA: {
        realm: "Court of Influence",
        locations: ["Grand Throne Room", "Diplomat's Hall", "Speaker's Circle", "Ambassador's Garden", "Royal Assembly"],
        enemies: ["Shyness Phantom", "Awkwardness Goblin", "Silence Curse", "Isolation Wraith", "Fear of Judgment"],
        weapons: ["Crown of Presence", "Scepter of Persuasion", "Cloak of Charm", "Ring of Influence", "Voice of Command"],
        actions: ["inspire", "unite", "persuade", "lead", "charm", "rally", "command"],
        virtues: ["Charisma", "Leadership", "Influence", "Presence", "Magnetism"]
    }
}

const DIFFICULTY_SCALES = {
    QUICK: {
        scope: "Skirmish",
        prefix: ["Swift", "Quick", "Rapid", "Lightning"],
        intensity: ["encounter", "challenge", "trial"]
    },
    STANDARD: {
        scope: "Adventure",
        prefix: ["Noble", "Heroic", "Brave", "Valiant"],
        intensity: ["quest", "mission", "journey"]
    },
    LONG: {
        scope: "Campaign",
        prefix: ["Epic", "Legendary", "Grand", "Mighty"],
        intensity: ["crusade", "expedition", "odyssey"]
    },
    EPIC: {
        scope: "Saga",
        prefix: ["Mythical", "Divine", "Cosmic", "Ultimate"],
        intensity: ["destiny", "prophecy", "legend"]
    }
}

export class AIService {

    static async generateQuest(userPrompt, preferredStat = null, difficulty = 'STANDARD') {
        try {
            const groqClient = getGroqClient()
            const systemPrompt = this.buildEpicQuestSystemPrompt()
            const userMessage = this.buildEpicQuestUserPrompt(userPrompt, preferredStat, difficulty)

            const completion = await groqClient.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.6,
                max_tokens: 600,
                response_format: { type: "json_object" }
            })

            const aiResponse = JSON.parse(completion.choices[0].message.content)
            return this.processEpicQuestResponse(aiResponse, userPrompt)

        } catch (error) {
            console.error('Epic AI quest generation failed:', error)
            return this.generateEpicQuestFallback(userPrompt, preferredStat, difficulty)
        }
    }

    static buildEpicQuestSystemPrompt() {
        return `You are the Grand Quest Master of the Nest Realm, a mystical being who transforms mundane tasks into EPIC RPG adventures!

YOUR MISSION: Convert boring real-world tasks into legendary quests with full fantasy lore.

REALMS & LORE:
💪 FORGE OF TITANS (Strength): Iron Temple, Dragon's Peak, battles against Laziness Beasts
🎯 ARTISAN'S DOMAIN (Dexterity): Crystal Workshop, Melody Hall, crafting against Chaos Imps  
🧠 MYSTIC ARCHIVES (Wisdom): Ancient Library, Scholar's Tower, studying to defeat Ignorance Shadows
✨ COURT OF INFLUENCE (Charisma): Grand Throne Room, inspiring others, conquering Shyness Phantoms

DIFFICULTY SCALES:
- QUICK: Swift Skirmishes and Lightning Encounters
- STANDARD: Heroic Adventures and Noble Quests  
- LONG: Epic Campaigns and Grand Expeditions
- EPIC: Mythical Sagas and Divine Prophecies

TRANSFORMATION RULES:
1. Make it EPIC and fantasy-themed but keep the real task clear
2. Use fantasy locations, enemies, weapons, and magic
3. Real task should still be obvious (gym = Iron Temple, study = Ancient Library)
4. Include epic language: "forge", "vanquish", "ascend", "master"
5. Add mystical elements: dragons, magic, ancient powers
6. Make the user feel like a legendary hero

RESPONSE FORMAT:
{
    "title": "Epic fantasy quest title",
    "description": "Rich lore-filled description with fantasy elements",
    "targetStat": "STRENGTH|DEXTERITY|WISDOM|CHARISMA|null",
    "difficulty": "QUICK|STANDARD|LONG|EPIC",
    "isDaily": boolean,
    "epicElements": {
        "realm": "Which fantasy realm",
        "enemy": "What you're fighting against", 
        "weapon": "Mystical tool/weapon used",
        "reward": "Mystical reward beyond XP"
    }
}`
    }

    static buildEpicQuestUserPrompt(userPrompt, preferredStat, difficulty) {
        let prompt = `Transform this mundane task into an EPIC RPG QUEST: "${userPrompt}"`

        if (preferredStat) {
            const realm = RPG_LORE[preferredStat]?.realm || "Unknown Realm"
            prompt += `\nMust take place in the ${realm}`
        }

        if (difficulty !== 'STANDARD') {
            const scale = DIFFICULTY_SCALES[difficulty]?.scope || "Adventure"
            prompt += `\nThis should be a ${scale} level quest`
        }

        prompt += `\n\nMake it LEGENDARY! Include fantasy elements, epic language, and mystical lore while keeping the real task clear!`

        return prompt
    }

    static processEpicQuestResponse(aiResponse, originalPrompt) {
        const requiredFields = ['title', 'targetStat', 'difficulty']
        for (const field of requiredFields) {
            if (!(field in aiResponse)) {
                throw new Error(`Missing required field: ${field}`)
            }
        }

        const baseXP = QUEST_REWARDS.BASE_XP[aiResponse.difficulty] || QUEST_REWARDS.BASE_XP.STANDARD
        let experienceReward = QUEST_REWARDS.calculateQuestXP(
            baseXP,
            aiResponse.isDaily || false,
            aiResponse.targetStat
        )

        return {
            title: aiResponse.title.substring(0, 120),
            description: aiResponse.description || this.generateEpicDescription(originalPrompt, aiResponse.targetStat),
            targetStat: aiResponse.targetStat,
            difficulty: aiResponse.difficulty,
            isDaily: aiResponse.isDaily || false,
            experienceReward,
            epicElements: aiResponse.epicElements || this.generateEpicElements(aiResponse.targetStat, aiResponse.difficulty),
            tags: this.generateEpicTags(originalPrompt, aiResponse.targetStat),
            generatedBy: 'epic_ai',
            aiMetadata: {
                prompt: originalPrompt,
                model: 'llama-3.3-70b-versatile',
                generatedAt: new Date(),
                epicLevel: aiResponse.difficulty
            }
        }
    }

    static generateEpicQuestFallback(userPrompt, preferredStat, difficulty) {
        console.log('Using fallback quest generation')

        const detectedStat = preferredStat || STAT_RULES.detectStatFromDescription(userPrompt)

        const epicTitle = this.generateEpicTitle(userPrompt, detectedStat, difficulty)
        const epicDescription = this.generateEpicDescription(userPrompt, detectedStat)
        const epicElements = this.generateEpicElements(detectedStat, difficulty)

        const baseXP = QUEST_REWARDS.BASE_XP[difficulty] || QUEST_REWARDS.BASE_XP.STANDARD
        const experienceReward = QUEST_REWARDS.calculateQuestXP(baseXP, false, detectedStat) + 5

        return {
            title: epicTitle,
            description: epicDescription,
            targetStat: detectedStat,
            difficulty,
            isDaily: false,
            experienceReward,
            epicElements,
            tags: this.generateEpicTags(userPrompt, detectedStat),
            generatedBy: 'epic_fallback',
            aiMetadata: {
                prompt: userPrompt,
                model: 'fallback-system',
                generatedAt: new Date(),
                fallbackReason: 'AI service unavailable'
            }
        }
    }

    static generateEpicTitle(userPrompt, stat, difficulty) {
        if (!stat || !RPG_LORE[stat]) {
            return this.generateGenericEpicTitle(userPrompt, difficulty)
        }

        const lore = RPG_LORE[stat]
        const scale = DIFFICULTY_SCALES[difficulty] || DIFFICULTY_SCALES.STANDARD

        const templates = [
            `${this.random(scale.prefix)} ${this.random(scale.intensity)} to ${this.random(lore.actions)} the ${this.random(lore.locations)}`,
            `${this.random(scale.prefix)} Quest: ${this.random(lore.actions)} the ${this.random(lore.enemies)} of ${this.random(lore.virtues)}`,
            `Seek the ${this.random(lore.weapons)} in the ${this.random(lore.locations)}`,
            `${this.random(scale.prefix)} Battle Against the ${this.random(lore.enemies)}`,
            `Forge Your ${this.random(lore.virtues)} in the ${this.random(lore.realm)}`
        ]

        return this.random(templates)
    }

    static generateGenericEpicTitle(userPrompt, difficulty) {
        const scale = DIFFICULTY_SCALES[difficulty] || DIFFICULTY_SCALES.STANDARD
        const genericActions = ["Master", "Conquer", "Achieve", "Complete", "Triumph"]

        const cleanPrompt = userPrompt.charAt(0).toUpperCase() + userPrompt.slice(1)
        return `${this.random(scale.prefix)} ${this.random(scale.intensity)} to ${this.random(genericActions)}: ${cleanPrompt}`
    }

    static generateEpicDescription(userPrompt, stat) {
        if (!stat || !RPG_LORE[stat]) {
            return `Embark on a legendary quest to master the ancient art of: ${userPrompt}. The realm awaits your valor!`
        }

        const lore = RPG_LORE[stat]
        const descriptions = [
            `In the mystical ${lore.realm}, brave adventurers must ${this.random(lore.actions)} their way to glory. Armed with the ${this.random(lore.weapons)}, you shall face the dreaded ${this.random(lore.enemies)} and claim your ${this.random(lore.virtues)}.`,
            `The ancient ${this.random(lore.locations)} calls to you! Take up the ${this.random(lore.weapons)} and ${this.random(lore.actions)} the forces of ${this.random(lore.enemies)} that threaten the realm.`,
            `Legend speaks of heroes who venture into the ${lore.realm} to ${this.random(lore.actions)} the ultimate challenge. Will you be the one to wield the ${this.random(lore.weapons)} and achieve ${this.random(lore.virtues)}?`
        ]

        return this.random(descriptions)
    }

    static generateEpicElements(stat, difficulty) {
        if (!stat || !RPG_LORE[stat]) {
            return {
                realm: "The Unknown Realm",
                enemy: "Procrastination Beast",
                weapon: "Blade of Determination",
                reward: "Glory and Honor"
            }
        }

        const lore = RPG_LORE[stat]
        const rewards = {
            QUICK: ["Swift Victory", "Quick Triumph", "Rapid Glory"],
            STANDARD: ["Heroic Honors", "Noble Recognition", "Adventurer's Prize"],
            LONG: ["Epic Treasures", "Legendary Status", "Grand Achievement"],
            EPIC: ["Divine Blessing", "Mythical Power", "Cosmic Recognition"]
        }

        return {
            realm: lore.realm,
            enemy: this.random(lore.enemies),
            weapon: this.random(lore.weapons),
            reward: this.random(rewards[difficulty] || rewards.STANDARD)
        }
    }

    static generateEpicTags(userPrompt, stat) {
        const baseTags = ['epic', 'adventure', 'quest']

        if (stat && RPG_LORE[stat]) {
            baseTags.push(RPG_LORE[stat].realm.toLowerCase().replace(/\s+/g, '-'))
        }

        const prompt = userPrompt.toLowerCase()
        const contextTags = {
            'gym': ['strength', 'warrior', 'combat'],
            'study': ['wisdom', 'scholar', 'magic'],
            'art': ['dexterity', 'craft', 'creation'],
            'social': ['charisma', 'influence', 'leadership']
        }

        for (const [keyword, tags] of Object.entries(contextTags)) {
            if (prompt.includes(keyword)) {
                baseTags.push(...tags)
            }
        }

        return [...new Set(baseTags)]
    }

    // ===== STAT DETECTION SYSTEM =====

    static detectQuestStat(questTitle, questDescription = '') {
        const fullText = `${questTitle} ${questDescription}`.toLowerCase()

        const gameRulesStat = STAT_RULES.detectStatFromDescription(fullText)
        if (gameRulesStat) {
            console.log(`📊 Stat detected by gameRules: ${gameRulesStat}`)
            return gameRulesStat
        }

        return this.detectStatByContext(fullText)
    }


    static detectStatByContext(text) {
        const contextPatterns = {
            STRENGTH: [
                /physical|body|muscle|fitness|health|exercise|sport|workout|train|run|walk|bike|swim|lift/,
                /gym|weights|cardio|strength|endurance|power|energy/,
                /push.*up|sit.*up|squat|deadlift|bench|marathon|jog/
            ],
            DEXTERITY: [
                /art|craft|create|make|build|design|draw|paint|sketch|music|instrument/,
                /cook|bake|recipe|kitchen|food|meal|knife|skill|hand|finger/,
                /sew|knit|woodwork|pottery|sculpture|photography|guitar|piano|violin/
            ],
            WISDOM: [
                /study|learn|read|book|research|school|university|course|lesson|exam/,
                /knowledge|understand|analyze|think|memory|brain|mind|logic/,
                /code|program|math|science|history|language|philosophy|write/
            ],
            CHARISMA: [
                /talk|speak|conversation|social|people|friend|family|meeting|present/,
                /lead|team|group|communicate|network|call|phone|interview/,
                /influence|persuade|charm|confidence|public|audience|speech/
            ]
        }

        const statScores = {}

        for (const [stat, patterns] of Object.entries(contextPatterns)) {
            statScores[stat] = 0

            for (const pattern of patterns) {
                const matches = text.match(pattern)
                if (matches) {
                    statScores[stat] += matches.length
                }
            }
        }

        const maxScore = Math.max(...Object.values(statScores))
        if (maxScore === 0) {
            return null
        }

        const detectedStat = Object.keys(statScores).find(stat => statScores[stat] === maxScore)
        return detectedStat
    }


    static enhanceManualQuest(questData) {
        if (!questData.targetStat) {
            questData.targetStat = this.detectQuestStat(questData.title, questData.description)
        }

        if (questData.targetStat) {
            const baseXP = QUEST_REWARDS.BASE_XP[questData.difficulty] || QUEST_REWARDS.BASE_XP.STANDARD
            questData.experienceReward = QUEST_REWARDS.calculateQuestXP(
                baseXP,
                questData.isDaily || false,
                questData.targetStat
            )
        }

        return questData
    }

    static random(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

}

export default AIService