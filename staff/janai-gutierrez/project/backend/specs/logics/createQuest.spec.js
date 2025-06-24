import { after, before, afterEach, describe, it } from "mocha"
import { expect } from "chai"
import 'dotenv/config'
import mongoose from 'mongoose'
import Quest from "../../models/Quest.js"
import User from "../../models/User.js"
import createQuest from "../../logics/createQuest.js"
import { AIService } from "../../utils/aiService.js"

describe('createQuest', () => {
    let userId
    let originalGenerateQuest
    let originalEnhanceManualQuest

    before(() => {
        return mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.MONGO_DB_TEST
        })
    })

    after(() => {
        return mongoose.disconnect()
    })

    beforeEach(() => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'Test123!'
        }

        return User.create(userData)
            .then(createdUser => {
                userId = createdUser._id.toString()

                // Mock AI services
                originalGenerateQuest = AIService.generateQuest
                originalEnhanceManualQuest = AIService.enhanceManualQuest

                AIService.generateQuest = async (title, userProfile, difficulty) => {
                    return {
                        title: `AI Enhanced: ${title}`,
                        description: 'AI generated description',
                        difficulty: difficulty || 'STANDARD',
                        experienceReward: 60,
                        targetStat: 'STRENGTH',
                        generatedBy: 'ai',
                        tags: ['ai-generated'],
                        epicElements: { theme: 'epic' },
                        aiMetadata: { model: 'test' }
                    }
                }

                AIService.enhanceManualQuest = (questInfo) => {
                    return {
                        ...questInfo,
                        targetStat: 'WISDOM',
                        tags: ['manual', 'enhanced']
                    }
                }
            })
    })

    afterEach(() => {
        // Restore original AI services
        if (originalGenerateQuest) {
            AIService.generateQuest = originalGenerateQuest
        }
        if (originalEnhanceManualQuest) {
            AIService.enhanceManualQuest = originalEnhanceManualQuest
        }

        return Promise.all([
            Quest.deleteMany(),
            User.deleteMany()
        ])
    })

    it('GIVEN valid data with AI generation WHEN called createQuest THEN creates AI-generated quest', () => {
        const questData = {
            title: 'Go to gym',
            useAI: true,
            difficulty: 'STANDARD'
        }

        return createQuest(userId, questData)
            .then(quest => {
                expect(quest).to.be.an('object')
                expect(quest.title).to.equal('AI Enhanced: Go to gym')
                expect(quest.description).to.equal('AI generated description')
                expect(quest.difficulty).to.equal('STANDARD')
                expect(quest.experienceReward).to.equal(60)
                expect(quest.targetStat).to.equal('STRENGTH')
                expect(quest.generatedBy).to.equal('ai')
                expect(quest.userId.toString()).to.equal(userId)
                expect(quest.isCompleted).to.equal(false)
                expect(quest.tags).to.include('ai-generated')
            })
    })

    it('GIVEN valid data without AI WHEN called createQuest THEN creates manual quest with enhancement', () => {
        const questData = {
            title: 'Read a book',
            useAI: false,
            difficulty: 'QUICK'
        }

        return createQuest(userId, questData)
            .then(quest => {
                expect(quest).to.be.an('object')
                expect(quest.title).to.equal('Read a book')
                expect(quest.description).to.equal('')
                expect(quest.difficulty).to.equal('QUICK')
                expect(quest.experienceReward).to.equal(35) // QUICK (25) + targetStat bonus (10)
                expect(quest.targetStat).to.equal('WISDOM')
                expect(quest.generatedBy).to.equal('user')
                expect(quest.userId.toString()).to.equal(userId)
                expect(quest.isCompleted).to.equal(false)

                // FIX: These tags are added by the mock enhanceManualQuest
                expect(quest.tags).to.include('manual')
                expect(quest.tags).to.include('enhanced')
            })
    })

    it('GIVEN empty title WHEN called createQuest THEN throws error', () => {
        const questData = {
            title: '',
            useAI: false
        }

        return createQuest(userId, questData)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('Quest title is required')
            })
    })

    it('GIVEN whitespace title WHEN called createQuest THEN throws error', () => {
        const questData = {
            title: '   ',
            useAI: false
        }

        return createQuest(userId, questData)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('Quest title is required')
            })
    })

    it('GIVEN missing userId WHEN called createQuest THEN throws error', () => {
        const questData = {
            title: 'Test quest',
            useAI: false
        }

        return createQuest(null, questData)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('User ID is required')
            })
    })
})