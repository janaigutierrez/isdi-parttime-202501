import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

describe('createQuest', () => {
    let user
    let User, Quest

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST)
        User = mongoose.models.User || mongoose.model('User')
        Quest = mongoose.models.Quest || mongoose.model('Quest')
    })

    beforeEach(async () => {
        await User.deleteMany()
        await Quest.deleteMany()

        const hashedPassword = await bcrypt.hash('123456789', 10)
        user = await new User({
            username: 'testuser',
            email: 'test@example.com',
            password: hashedPassword
        }).save()
    })

    after(async () => {
        await User.deleteMany()
        await Quest.deleteMany()
        await mongoose.disconnect()
    })

    it('GIVEN valid quest data WHEN creating quest directly THEN creates successfully', async () => {
        const questData = {
            title: 'Go to the gym for workout',
            description: 'One hour training session',
            difficulty: 'STANDARD',
            userId: user._id,
            experienceReward: 50
        }

        const quest = new Quest(questData)
        await quest.save()

        expect(quest.title).to.equal('Go to the gym for workout')
        expect(quest.difficulty).to.equal('STANDARD')
        expect(quest.userId.toString()).to.equal(user._id.toString())
        expect(quest.experienceReward).to.equal(50)

        const questInDB = await Quest.findById(quest._id)
        expect(questInDB).to.exist
        expect(questInDB.title).to.equal('Go to the gym for workout')
    })

    it('GIVEN quest with gym title WHEN using model pre-save THEN auto-detects STRENGTH', async () => {
        const quest = new Quest({
            title: 'Intense gym workout session',
            description: 'Heavy lifting and cardio',
            difficulty: 'STANDARD',
            userId: user._id,
            experienceReward: 50
        })

        await quest.save()

        // Quest model should auto-detect STRENGTH from "gym workout"
        expect(quest.targetStat).to.equal('STRENGTH')
    })

    it('GIVEN quest with study title WHEN using model pre-save THEN auto-detects WISDOM', async () => {
        const quest = new Quest({
            title: 'Study mathematics for exam',
            description: 'Prepare for final test',
            difficulty: 'STANDARD',
            userId: user._id,
            experienceReward: 50
        })

        await quest.save()

        expect(quest.targetStat).to.equal('WISDOM')
    })

    it('GIVEN quest with art title WHEN using model pre-save THEN auto-detects DEXTERITY', async () => {
        const quest = new Quest({
            title: 'Paint a beautiful landscape',
            description: 'Create artwork',
            difficulty: 'STANDARD',
            userId: user._id,
            experienceReward: 50
        })

        await quest.save()

        expect(quest.targetStat).to.equal('DEXTERITY')
    })

    it('GIVEN quest with social title WHEN using model pre-save THEN auto-detects CHARISMA', async () => {
        const quest = new Quest({
            title: 'Call mom and have long chat',
            description: 'Social interaction',
            difficulty: 'STANDARD',
            userId: user._id,
            experienceReward: 50
        })

        await quest.save()

        expect(quest.targetStat).to.equal('CHARISMA')
    })

    it('GIVEN daily quest WHEN using model pre-save THEN calculates bonus XP', async () => {
        const quest = new Quest({
            title: 'Daily morning routine',
            difficulty: 'STANDARD',
            isDaily: true,
            userId: user._id
        })

        await quest.save()

        expect(quest.isDaily).to.be.true
        // Pre-save hook should calculate: 50 * 1.2 = 60
        expect(quest.experienceReward).to.equal(60)
    })

    it('GIVEN quest with targetStat WHEN using model pre-save THEN adds stat bonus', async () => {
        const quest = new Quest({
            title: 'Generic task',
            difficulty: 'STANDARD',
            targetStat: 'WISDOM',
            userId: user._id
        })

        await quest.save()

        // Pre-save should calculate: 50 base + 10 stat bonus = 60
        expect(quest.experienceReward).to.equal(60)
        expect(quest.targetStat).to.equal('WISDOM')
    })

    it('GIVEN epic quest WHEN using model pre-save THEN calculates correct XP', async () => {
        const quest = new Quest({
            title: 'Epic multi-day project',
            difficulty: 'EPIC',
            userId: user._id
        })

        await quest.save()

        // Epic base XP should be 200
        expect(quest.experienceReward).to.equal(200)
        expect(quest.difficulty).to.equal('EPIC')
    })

    it('GIVEN quest without stat keywords WHEN using model pre-save THEN targetStat remains null', async () => {
        const quest = new Quest({
            title: 'Buy groceries and go home',
            difficulty: 'STANDARD',
            userId: user._id,
            experienceReward: 50
        })

        await quest.save()

        expect(quest.targetStat).to.be.null
    })

    it('GIVEN quest completion WHEN calling complete method THEN updates completion status', async () => {
        const quest = new Quest({
            title: 'Test quest completion',
            difficulty: 'STANDARD',
            userId: user._id,
            experienceReward: 50
        })

        await quest.save()
        expect(quest.isCompleted).to.be.false
        expect(quest.completedAt).to.be.null

        await quest.complete()

        expect(quest.isCompleted).to.be.true
        expect(quest.completedAt).to.be.a('date')
    })
})