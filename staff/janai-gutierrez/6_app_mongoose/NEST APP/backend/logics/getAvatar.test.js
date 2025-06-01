import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import getAvatar from "./getAvatar.js"

describe('getAvatar', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
    })

    it('GIVEN an existent user with avatar WHEN getAvatar is called THEN returns user avatar', async () => {
        const userData = {
            username: 'Test-User',
            password: 'Test123!',
            email: 'test@mail.com',
            avatar: 'https://example.com/avatar.jpg'
        }
        const user = await data.users.create(userData)

        const avatar = await getAvatar(user._id.toString())

        expect(avatar).to.equal('https://example.com/avatar.jpg')
    })

    it('GIVEN an existent user without avatar WHEN getAvatar is called THEN returns generated avatar URL', async () => {
        const userData = {
            username: 'Test-User',
            password: 'Test123!',
            email: 'test@mail.com'
        }
        const user = await data.users.create(userData)

        const avatar = await getAvatar(user._id.toString())

        expect(avatar).to.include('ui-avatars.com')
        expect(avatar).to.include('Test-User')
    })

    it('GIVEN a non existent user id WHEN getAvatar is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await getAvatar(fakeId)
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })
})