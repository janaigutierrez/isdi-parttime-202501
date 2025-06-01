import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import registerUser from "./registerUser.js"

describe('registerUser', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN valid email, password and username WHEN registerUser is called THEN creates user and returns ID', async () => {
        const userId = await registerUser('test@example.com', 'ValidPassword123!', 'testuser')

        expect(userId).to.exist
        expect(userId).to.be.a('string')
        expect(userId).to.have.lengthOf(24)

        const createdUser = await data.users.findById(userId)
        expect(createdUser).to.exist
        expect(createdUser.email).to.equal('test@example.com')
        expect(createdUser.password).to.equal('ValidPassword123!')
        expect(createdUser.username).to.equal('testuser')
    })

    it('GIVEN existing email WHEN registerUser is called THEN throws DuplicityError', async () => {
        await data.users.create({
            email: 'existing@example.com',
            password: 'Password123!',
            username: 'existinguser'
        })

        try {
            await registerUser('existing@example.com', 'NewPassword123!', 'newuser')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.DuplicityError)
            expect(error.message).to.equal('user already exists')
        }
    })

    it('GIVEN username generated from email WHEN registerUser is called THEN username is correct', async () => {
        const userId = await registerUser('john.doe@company.com', 'Password123!', 'john.doe')

        const user = await data.users.findById(userId)
        expect(user.username).to.equal('john.doe')
        expect(user.email).to.equal('john.doe@company.com')
    })

    it('GIVEN email with special characters WHEN registerUser is called THEN user is created successfully', async () => {
        const userId = await registerUser('user+test@example-domain.co.uk', 'Password123!', 'user+test')

        const user = await data.users.findById(userId)
        expect(user).to.exist
        expect(user.email).to.equal('user+test@example-domain.co.uk')
        expect(user.username).to.equal('user+test')
    })


})