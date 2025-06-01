import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import updateUsername from "./updateUsername.js"

describe('updateUsername', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN valid user ID and new username WHEN updateUsername is called THEN updates username successfully', async () => {
        // Setup
        const userData = {
            username: 'OldUsername',
            password: 'Test123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)
        const newUsername = 'NewAwesomeUsername'

        // Test
        await updateUsername(user._id.toString(), newUsername)

        // Verify update
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.username).to.equal(newUsername)
    })

    it('GIVEN username already used by another user WHEN updateUsername is called THEN throws ContentError', async () => {
        // Setup - Crear dos usuarios
        const user1Data = {
            username: 'UniqueUser1',
            password: 'Test123!',
            email: 'user1@example.com'
        }
        const user2Data = {
            username: 'UniqueUser2',
            password: 'Test123!',
            email: 'user2@example.com'
        }

        const user1 = await data.users.create(user1Data)
        const user2 = await data.users.create(user2Data)

        try {
            // User1 intenta usar username de User2
            await updateUsername(user1._id.toString(), 'UniqueUser2')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('username UniqueUser2 already exists')
        }
    })

    it('GIVEN user updates to same username WHEN updateUsername is called THEN succeeds', async () => {
        // Setup
        const userData = {
            username: 'SameUsername',
            password: 'Test123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)

        // Test - Actualizar al mismo username
        await updateUsername(user._id.toString(), 'SameUsername')

        // Verify - Username sigue igual
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.username).to.equal('SameUsername')
    })

    it('GIVEN username with special characters WHEN updateUsername is called THEN updates successfully', async () => {
        // Setup
        const userData = {
            username: 'SimpleUser',
            password: 'Test123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)
        const specialUsername = 'User_With-Dots.And123'

        // Test
        await updateUsername(user._id.toString(), specialUsername)

        // Verify
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.username).to.equal(specialUsername)
    })

    it('GIVEN non-existent user ID WHEN updateUsername is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await updateUsername(fakeId, 'NewUsername')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN invalid user ID format WHEN updateUsername is called THEN throws ContentError', async () => {
        try {
            const invalidId = 'invalid-id-format'
            await updateUsername(invalidId, 'ValidUsername')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('Invalid user ID format')
        }
    })
})