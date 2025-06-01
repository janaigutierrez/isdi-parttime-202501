import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import getUsername from "./getUsername.js"

describe('getUsername', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN valid user ID WHEN getUsername is called THEN returns username', async () => {
        const userData = {
            username: 'TestUserName',
            password: 'Test123!',
            email: 'test@test.com',
            bio: 'Test bio'
        }
        const user = await data.users.create(userData)

        const username = await getUsername(user._id.toString())

        expect(username).to.exist
        expect(username).to.be.a('string')
        expect(username).to.equal('TestUserName')
    })

    it('GIVEN non-existent user ID WHEN getUsername is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await getUsername(fakeId)
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN invalid user ID format WHEN getUsername is called THEN throws ContentError', async () => {
        try {
            const invalidId = 'invalid-id-format'
            await getUsername(invalidId)
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('Invalid user ID format')
        }
    })

    it('GIVEN user with special characters in username WHEN getUsername is called THEN returns exact username', async () => {
        const userData = {
            username: 'User_With-Special.Chars123',
            password: 'Test123!',
            email: 'special@test.com'
        }
        const user = await data.users.create(userData)

        const username = await getUsername(user._id.toString())

        expect(username).to.equal('User_With-Special.Chars123')
    })
})