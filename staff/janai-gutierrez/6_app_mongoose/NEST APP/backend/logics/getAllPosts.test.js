import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import getAllPosts from "./getAllPosts.js"

describe('getAllPosts', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN an existent user and posts in DB WHEN getAllPosts is called THEN returns all posts with author info', async () => {
        // Setup: crear usuario y posts
        const userData = {
            username: 'Test-User',
            password: 'Test123!',
            email: 'test@mail.com'
        }
        const user = await data.users.create(userData)

        const postData = {
            title: 'Test Post',
            description: 'Test Description',
            author: user._id,
            likes: [user._id.toString()]  // Usuario ha dado like
        }
        await data.posts.create(postData)

        // Test: obtener posts
        const posts = await getAllPosts(user._id.toString())

        // Verificaciones
        expect(posts).to.be.an('array')
        expect(posts.length).to.equal(1)
        expect(posts[0].title).to.equal('Test Post')
        expect(posts[0].author.username).to.equal('Test-User')
        expect(posts[0].isLiked).to.be.true
        expect(posts[0].createdOn).to.be.a('string')
    })

    it('GIVEN a non existent user id WHEN getAllPosts is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await getAllPosts(fakeId)
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })
})