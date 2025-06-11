import express from "express";
import { AIService } from "../../utils/aiService.js";

const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const { title, useAI, difficulty } = req.body

        let quest
        if (useAI) {
            quest = await AIService.generateQuest(
                title,
                null,
                difficulty || "STANDARD"
            )
        } else {
            quest = {
                title: title.trim(),
                description: '',
                difficulty: difficulty || 'STANDARD',
                experienceReward: 50,
                targetStat: null,
                generatedBy: 'user'
            }
            quest = AIService.enhanceManualQuest(quest)

        }

        res.json({
            success: true,
            quest: quest
        })
    } catch (error) {
        console.error('Quest creation failed:', error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

export default router