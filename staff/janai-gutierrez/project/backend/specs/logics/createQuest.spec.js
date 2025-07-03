import { after, before, afterEach, describe, it } from "mocha"
import { expect } from "chai"
import 'dotenv/config'
import mongoose from 'mongoose'
import User from "../../models/User.js"
import Quest from "../../models/Quest.js"
import createQuest from "../../logics/createQuest.js"
import { errors } from "common"

describe('createQuest', () => {
    let userId

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
            })
    })

    afterEach(() => {
        return Promise.all([
            User.deleteMany(),
            Quest.deleteMany()
        ])
    })

    it('GIVEN valid quest data WHEN called createQuest THEN creates quest successfully', () => {
        const questData = {
            title: 'Go to the gym',
            description: 'Workout session',
            difficulty: 'STANDARD'
        }

        return createQuest(userId, questData)
            .then(result => {
                expect(result).to.have.property('title', 'Go to the gym')
                expect(result).to.have.property('difficulty', 'STANDARD')
                expect(result).to.have.property('experienceReward')
                expect(result.experienceReward).to.be.greaterThan(0)
            })
    })

    it('GIVEN gym quest WHEN called createQuest THEN auto-detects STRENGTH stat', () => {
        const questData = {
            title: 'Intense gym workout',
            difficulty: 'STANDARD'
        }

        return createQuest(userId, questData)
            .then(result => {
                expect(result.targetStat).to.equal('STRENGTH')
                expect(result.experienceReward).to.be.greaterThan(50)
            })
    })

    it('GIVEN invalid title WHEN called createQuest THEN throws ValidationError', () => {
        const questData = {
            title: 'ab', // Too short
            difficulty: 'STANDARD'
        }

        return createQuest(userId, questData)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.include('title must be at least 3 characters')
            })
    })

    it('GIVEN useAI true WHEN called createQuest THEN generates with AI', () => {
        const questData = {
            title: 'Go to the gym',
            useAI: true,
            difficulty: 'STANDARD'
        }

        return createQuest(userId, questData)
            .then(result => {
                expect(result.generatedBy).to.be.oneOf(['ai', 'epic_fallback'])
                expect(result.title).to.exist
            })
    })
})