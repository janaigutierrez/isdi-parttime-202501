import express from "express";
import handlers from './handlers/index.js'

const router = express.Router()

router.post('/create', handlers.createQuest)

export default router