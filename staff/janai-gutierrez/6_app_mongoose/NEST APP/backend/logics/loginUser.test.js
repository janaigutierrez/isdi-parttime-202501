import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import loginUser from "./loginUser.js"

describe('loginUser', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN valid email and password WHEN loginUser is called THEN returns user ID', async () => {
        const userData = {
            username: 'TestUser',
            password: 'ValidPassword123!',
            email: 'test@example.com',
            bio: 'Test user bio'
        }
        const user = await data.users.create(userData)

        const userId = await loginUser('test@example.com', 'ValidPassword123!')

        expect(userId).to.exist
        expect(userId).to.be.a('string')
        expect(userId).to.equal(user._id.toString())
    })

    it('GIVEN valid email but wrong password WHEN loginUser is called THEN throws AuthError', async () => {
        const userData = {
            username: 'TestUser',
            password: 'CorrectPassword123!',
            email: 'test@example.com'
        }
        await data.users.create(userData)

        try {
            await loginUser('test@example.com', 'WrongPassword123!')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.AuthError)
            expect(error.message).to.equal('invalid credentials')
        }
    })

    it('GIVEN non-existent email WHEN loginUser is called THEN throws ExistenceError', async () => {
        try {
            await loginUser('nonexistent@example.com', 'AnyPassword123!')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN empty password WHEN loginUser is called THEN throws AuthError', async () => {
        const userData = {
            username: 'TestUser',
            password: 'ActualPassword123!',
            email: 'test@example.com'
        }
        await data.users.create(userData)

        try {
            await loginUser('test@example.com', '')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.AuthError)
            expect(error.message).to.equal('invalid credentials')
        }
    })
})