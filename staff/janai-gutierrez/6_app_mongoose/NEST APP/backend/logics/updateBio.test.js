import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import updateBio from "./updateBio.js"

describe('updateBio', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN valid user ID and bio WHEN updateBio is called THEN updates bio successfully', async () => {
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com',
            bio: 'Old bio description'
        }
        const user = await data.users.create(userData)
        const newBio = 'This is my updated bio with new information about myself'

        await updateBio(user._id.toString(), newBio)

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.bio).to.equal(newBio)
    })

    it('GIVEN user with no bio WHEN updateBio is called THEN sets bio successfully', async () => {
        // Usuario sin bio inicial
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com'
            // Sin bio
        }
        const user = await data.users.create(userData)
        const newBio = 'This is my first bio ever!'

        await updateBio(user._id.toString(), newBio)

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.bio).to.equal(newBio)
    })

    it('GIVEN empty bio string WHEN updateBio is called THEN clears bio', async () => {
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com',
            bio: 'Old bio that will be removed'
        }
        const user = await data.users.create(userData)

        await updateBio(user._id.toString(), '')

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.bio).to.equal('')
    })

    it('GIVEN bio with special characters WHEN updateBio is called THEN handles correctly', async () => {
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com'
        }
        const user = await data.users.create(userData)
        const specialBio = 'Bio with émojis 🚀, special chars & symbols! #coding @work 100%'

        await updateBio(user._id.toString(), specialBio)

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.bio).to.equal(specialBio)
    })

    it('GIVEN long bio within limit WHEN updateBio is called THEN updates successfully', async () => {
        const userData = {
            username: 'TestUser',
            password: 'Test123!',
            email: 'test@test.com'
        }
        const user = await data.users.create(userData)
        // Bio de 150 caracteres (dentro del límite de 200)
        const longBio = 'A'.repeat(150) + ' - This is a long bio that should be acceptable'

        await updateBio(user._id.toString(), longBio)

        const updatedUser = await data.users.findById(user._id)
        expect(updatedUser.bio).to.equal(longBio)
    })

    it('GIVEN non-existent user ID WHEN updateBio is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await updateBio(fakeId, 'New bio for non-existent user')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN invalid user ID format WHEN updateBio is called THEN throws ContentError', async () => {
        try {
            const invalidId = 'invalid-id-format'
            await updateBio(invalidId, 'Some bio text')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('Invalid user ID format')
        }
    })
})