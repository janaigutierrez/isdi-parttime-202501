import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import updateAvatar from "./updateAvatar.js"

describe('updateAvatar', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN valid user ID and avatar URL WHEN updateAvatar is called THEN updates avatar successfully', async () => {
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com',
            avatar: 'https://old-avatar.com/image.jpg'
        }
        const user = await data.users.create(userData)
        const newAvatarUrl = 'https://new-avatar.com/updated.jpg'

        await updateAvatar(user._id.toString(), newAvatarUrl)

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.avatar).to.equal(newAvatarUrl)
    })

    it('GIVEN user with no avatar WHEN updateAvatar is called THEN sets avatar successfully', async () => {
        // Usuario sin avatar inicial
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com'
            // Sin avatar
        }
        const user = await data.users.create(userData)
        const newAvatarUrl = 'https://first-avatar.com/image.jpg'

        await updateAvatar(user._id.toString(), newAvatarUrl)

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.avatar).to.equal(newAvatarUrl)
    })

    it('GIVEN base64 avatar data WHEN updateAvatar is called THEN updates avatar successfully', async () => {
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com'
        }
        const user = await data.users.create(userData)
        const base64Avatar = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'

        await updateAvatar(user._id.toString(), base64Avatar)

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.avatar).to.equal(base64Avatar)
    })

    it('GIVEN non-existent user ID WHEN updateAvatar is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await updateAvatar(fakeId, 'https://avatar.com/image.jpg')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN invalid user ID format WHEN updateAvatar is called THEN throws ContentError', async () => {
        try {
            const invalidId = 'invalid-id-format'
            await updateAvatar(invalidId, 'https://avatar.com/image.jpg')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('Invalid user ID format')
        }
    })

    it('GIVEN empty avatar string WHEN updateAvatar is called THEN sets empty avatar', async () => {
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com',
            avatar: 'https://old-avatar.com/image.jpg'
        }
        const user = await data.users.create(userData)

        await updateAvatar(user._id.toString(), '')

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.avatar).to.equal('')
    })
})