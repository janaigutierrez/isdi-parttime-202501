import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import getBio from "./getBio.js"

describe('getBio', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
    })

    it('GIVEN an existent user with bio WHEN getBio is called THEN returns user bio', async () => {
        const userData = {
            username: 'Test-User',
            password: 'Test123!',
            email: 'test@mail.com',
            bio: 'This is my test bio'
        }
        const user = await data.users.create(userData)

        const bio = await getBio(user._id.toString())

        expect(bio).to.equal('This is my test bio')
    })

    it('GIVEN an existent user without bio WHEN getBio is called THEN returns empty string', async () => {
        const userData = {
            username: 'Test-User',
            password: 'Test123!',
            email: 'test@mail.com'
        }
        const user = await data.users.create(userData)

        const bio = await getBio(user._id.toString())

        expect(bio).to.equal('')
    })

    it('GIVEN a non existent user id WHEN getBio is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await getBio(fakeId)
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })
})