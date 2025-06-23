import express from "express";
import handlers from './handlers/index.js'
import { protect } from "../../middleware/auth.js";

const router = express.Router()

router.get('/', protect, handlers.getAllQuests)
router.post('/create', protect, handlers.createQuest)

export default router