import { GroqClient } from './groqClient.js'
import { XPCalculator } from './XPCalculator.js'
import { FallbackSystem } from './fallbackSystem.js'

export class QuestGenerator {
    constructor() {
        this.groqClient = new GroqClient()
    }

    async generateQuest(userPrompt, preferredStat = null, difficulty = 'STANDARD') {
        try {
            const aiQuest = await this.generateWithAI(userPrompt, preferredStat, difficulty)
            return this.processAIResponse(aiQuest, userPrompt)
        } catch (error) {
            console.error('AI generation failed:', error.message)
            return FallbackSystem.generateQuest(userPrompt, preferredStat, difficulty)
        }
    }

    async generateWithAI(userPrompt, preferredStat, difficulty) {
        const systemPrompt = this.buildSystemPrompt()
        const userMessage = this.buildUserPrompt(userPrompt, preferredStat, difficulty)

        return await this.groqClient.generateQuest(systemPrompt, userMessage)
    }

    buildSystemPrompt() {
        return `Eres un Quest Master que transforma tareas diarias en aventuras épicas.

OBJETIVO: Hacer las tareas aburridas épicas pero SIMPLES y CLARAS.

EJEMPLOS:
"ir al gimnasio" → "Entrenar en el templo del hierro" 
"estudiar" → "Buscar sabiduría en la biblioteca ancestral"
"cocinar" → "Crear pociones en tu laboratorio"
"llamar familia" → "Fortalecer lazos del reino"

REINOS SIMPLES:
💪 STRENGTH: templo del hierro, entrenar, forjar
🎯 DEXTERITY: taller de creación, crear, perfeccionar  
🧠 WISDOM: biblioteca ancestral, estudiar, aprender
✨ CHARISMA: corte real, inspirar, conectar

REGLAS:
1. Título: 3-6 palabras máximo, 1 elemento fantástico
2. Descripción: 1-2 frases, tarea obvia
3. No usar nombres complejos
4. Enfócate en la acción, no en el mundo fantástico
5. Tiene que entenderse cual es la tarea a realizar

FORMATO JSON:
{
    "title": "Título épico simple (3-6 palabras)",
    "description": "Descripción breve que mantenga la tarea clara",
    "targetStat": "STRENGTH|DEXTERITY|WISDOM|CHARISMA|null",
    "difficulty": "QUICK|STANDARD|LONG|EPIC",
    "isDaily": boolean,
    "epicElements": {
        "realm": "Nombre simple del reino",
        "enemy": "Obstáculo simple", 
        "weapon": "Herramienta simple",
        "reward": "Recompensa simple"
    }
}`
    }

    buildUserPrompt(userPrompt, preferredStat, difficulty) {
        let prompt = `Transforma esta tarea en una quest épica simple: "${userPrompt}"`

        if (preferredStat) {
            const realms = {
                STRENGTH: "templo del hierro",
                DEXTERITY: "taller de creación",
                WISDOM: "biblioteca ancestral",
                CHARISMA: "corte real"
            }
            prompt += `\nUbicar en: ${realms[preferredStat] || "lugar místico"}`
        }

        prompt += `\n\n¡Manténlo SIMPLE e INSPIRADOR, la tarea real debe ser obvia.`
        return prompt
    }

    processAIResponse(aiResponse, originalPrompt) {
        if (!aiResponse.title || !aiResponse.difficulty) {
            throw new Error('AI response missing required fields')
        }

        if (aiResponse.targetStat === 'null' || aiResponse.targetStat === 'NULL' || aiResponse.targetStat === '') {
            aiResponse.targetStat = null
        }

        const experienceReward = XPCalculator.calculateQuestXP(
            XPCalculator.getBaseXP(aiResponse.difficulty),
            aiResponse.isDaily || false,
            aiResponse.targetStat
        ) + 10 // AI bonus

        return {
            title: aiResponse.title.substring(0, 80),
            description: aiResponse.description || `Completa: ${originalPrompt}`,
            targetStat: aiResponse.targetStat,
            difficulty: aiResponse.difficulty,
            isDaily: aiResponse.isDaily || false,
            experienceReward,
            epicElements: aiResponse.epicElements || FallbackSystem.generateEpicElements(aiResponse.targetStat),
            tags: ['ai-generated', 'epic'],
            generatedBy: 'ai',
            aiMetadata: {
                prompt: originalPrompt,
                model: 'llama-3.3-70b-versatile',
                generatedAt: new Date()
            }
        }
    }
}