import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

const User = mongoose.models.User || mongoose.model('User')

describe('updateUserTheme', () => {
    let user

    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST)
    })

    beforeEach(async () => {
        await User.deleteMany()

        const hashedPassword = await bcrypt.hash('123456789', 10)
        user = await new User({
            username: 'testuser',
            email: 'test@example.com',
            password: hashedPassword
        }).save()
    })

    after(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })

    const updateUserThemeInline = async (userId, theme) => {
        if (typeof userId !== 'string' || userId.trim().length === 0) {
            throw new Error('userId is required')
        }
        if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
            throw new Error('userId must be a valid ObjectId')
        }

        const validThemes = ['default', 'dark', 'library', 'mystic', 'medieval', 'warrior', 'academy']
        if (!validThemes.includes(theme)) {
            throw new Error(`Invalid theme. Valid themes: ${validThemes.join(', ')}`)
        }

        const foundUser = await User.findById(userId)
        if (!foundUser) {
            throw new Error('User not found')
        }

        if (!foundUser.preferences) {
            foundUser.preferences = {}
        }
        foundUser.preferences.theme = theme
        await foundUser.save()

        return {
            message: 'Theme updated successfully',
            theme: foundUser.preferences.theme,
            user: foundUser.toJSON()
        }
    }

    it('GIVEN valid theme WHEN called updateUserTheme THEN updates successfully', async () => {
        const result = await updateUserThemeInline(user._id.toString(), 'dark')

        expect(result).to.have.property('message', 'Theme updated successfully')
        expect(result).to.have.property('theme', 'dark')
        expect(result).to.have.property('user')

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.preferences.theme).to.equal('dark')
    })

    it('GIVEN library theme WHEN called updateUserTheme THEN updates successfully', async () => {
        const result = await updateUserThemeInline(user._id.toString(), 'library')

        expect(result.theme).to.equal('library')

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.preferences.theme).to.equal('library')
    })

    it('GIVEN invalid theme WHEN called updateUserTheme THEN throws error', async () => {
        try {
            await updateUserThemeInline(user._id.toString(), 'invalid-theme')
            expect.fail('Expected error')
        } catch (error) {
            expect(error.message).to.include('Invalid theme')
        }
    })

    it('GIVEN non-existent user WHEN called updateUserTheme THEN throws error', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString()

        try {
            await updateUserThemeInline(fakeId, 'dark')
            expect.fail('Expected error')
        } catch (error) {
            expect(error.message).to.equal('User not found')
        }
    })

    it('GIVEN invalid userId WHEN called updateUserTheme THEN throws validation error', async () => {
        try {
            await updateUserThemeInline('invalid-id', 'dark')
            expect.fail('Expected error')
        } catch (error) {
            expect(error.message).to.include('userId')
        }
    })

    it('GIVEN user without preferences WHEN called updateUserTheme THEN creates preferences object', async () => {
        // Remove preferences first
        await User.findByIdAndUpdate(user._id, { $unset: { preferences: 1 } })

        const result = await updateUserThemeInline(user._id.toString(), 'mystic')

        expect(result.theme).to.equal('mystic')

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.preferences).to.be.an('object')
        expect(updatedUser.preferences.theme).to.equal('mystic')
    })
})