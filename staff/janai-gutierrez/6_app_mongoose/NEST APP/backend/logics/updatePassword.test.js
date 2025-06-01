import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import updatePassword from "./updatePassword.js"

describe('updatePassword', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN valid user ID, correct old password and new password WHEN updatePassword is called THEN updates password successfully', async () => {
        // Setup
        const userData = {
            username: 'TestUser',
            password: 'OldPassword123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)
        const newPassword = 'NewSecurePassword456!'

        // Test
        await updatePassword(user._id.toString(), newPassword, 'OldPassword123!')

        // Verify update
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.password).to.equal(newPassword)
    })

    it('GIVEN correct old password but same new password WHEN updatePassword is called THEN updates successfully', async () => {
        // Setup
        const userData = {
            username: 'TestUser',
            password: 'SamePassword123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)

        // Test - Cambiar a la misma password
        await updatePassword(user._id.toString(), 'SamePassword123!', 'SamePassword123!')

        // Verify - Password sigue igual
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.password).to.equal('SamePassword123!')
    })

    it('GIVEN wrong old password WHEN updatePassword is called THEN throws AuthError', async () => {
        // Setup
        const userData = {
            username: 'TestUser',
            password: 'CorrectPassword123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)

        try {
            await updatePassword(user._id.toString(), 'NewPassword456!', 'WrongOldPassword!')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.AuthError)
            expect(error.message).to.equal('wrong password')
        }

        // Verify password wasn't changed
        const unchangedUser = await data.users.findById(user._id)
        expect(unchangedUser.password).to.equal('CorrectPassword123!')
    })

    it('GIVEN empty old password WHEN updatePassword is called THEN throws AuthError', async () => {
        // Setup
        const userData = {
            username: 'TestUser',
            password: 'ActualPassword123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)

        try {
            await updatePassword(user._id.toString(), 'NewPassword456!', '')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.AuthError)
            expect(error.message).to.equal('wrong password')
        }
    })

    it('GIVEN non-existent user ID WHEN updatePassword is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await updatePassword(fakeId, 'NewPassword123!', 'OldPassword123!')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN invalid user ID format WHEN updatePassword is called THEN throws ContentError', async () => {
        try {
            const invalidId = 'invalid-id-format'
            await updatePassword(invalidId, 'NewPassword123!', 'OldPassword123!')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('Invalid user ID format')
        }
    })

    it('GIVEN complex new password WHEN updatePassword is called THEN handles special characters correctly', async () => {
        // Setup
        const userData = {
            username: 'TestUser',
            password: 'Simple123!',
            email: 'test@example.com'
        }
        const user = await data.users.create(userData)
        const complexPassword = 'N3w-P@ssw0rd_With#Sp3c!al&Ch@rs%2024'

        // Test
        await updatePassword(user._id.toString(), complexPassword, 'Simple123!')

        // Verify
        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.password).to.equal(complexPassword)
    })
})