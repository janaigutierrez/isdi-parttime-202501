import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import updateEmail from "./updateEmail.js"

describe('updateEmail', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN valid user ID and new email WHEN updateEmail is called THEN updates email successfully', async () => {
        // Setup
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'old@example.com'
        }
        const user = await data.users.create(userData)
        const newEmail = 'new@example.com'

        // Test
        await updateEmail(user._id.toString(), newEmail)

        // Verify update
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.email).to.equal(newEmail)
    })

    it('GIVEN email already used by another user WHEN updateEmail is called THEN throws ContentError', async () => {
        // Setup - Crear dos usuarios
        const user1Data = {
            username: 'User1',
            password: 'Test123!',
            email: 'user1@example.com'
        }
        const user2Data = {
            username: 'User2',
            password: 'Test123!',
            email: 'user2@example.com'
        }

        const user1 = await data.users.create(user1Data)
        const user2 = await data.users.create(user2Data)

        try {
            // User1 intenta usar email de User2
            await updateEmail(user1._id.toString(), 'user2@example.com')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('email user2@example.com already exists')
        }
    })

    it('GIVEN user updates to same email WHEN updateEmail is called THEN succeeds (no change needed)', async () => {
        // Setup
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'same@example.com'
        }
        const user = await data.users.create(userData)

        // Test - Actualizar al mismo email
        await updateEmail(user._id.toString(), 'same@example.com')

        // Verify - Email sigue igual
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.email).to.equal('same@example.com')
    })

    it('GIVEN valid email with different case WHEN updateEmail is called THEN updates successfully', async () => {
        // Setup
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)
        const newEmail = 'NEW@EXAMPLE.COM'

        // Test
        await updateEmail(user._id.toString(), newEmail)

        // Verify
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.email).to.equal(newEmail)
    })

    it('GIVEN non-existent user ID WHEN updateEmail is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await updateEmail(fakeId, 'new@example.com')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN invalid user ID format WHEN updateEmail is called THEN throws ContentError', async () => {
        try {
            const invalidId = 'invalid-id-format'
            await updateEmail(invalidId, 'valid@example.com')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('Invalid user ID format')
        }
    })
})