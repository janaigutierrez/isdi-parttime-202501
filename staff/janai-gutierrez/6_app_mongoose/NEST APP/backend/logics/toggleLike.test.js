import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import toggleLike from "./toggleLike.js"

describe('toggleLike', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN an existent post without user like WHEN toggleLike is called THEN adds like to post', async () => {
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
            likes: []
        }
        const post = await data.posts.create(postData)

        await toggleLike(user._id.toString(), post._id.toString())

        const updatedPost = await data.posts.findById(post._id)
        expect(updatedPost.likes).to.have.length(1)
        expect(updatedPost.likes[0].toString()).to.equal(user._id.toString())
    })

    it('GIVEN an existent post with user like WHEN toggleLike is called THEN removes like from post', async () => {
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
            likes: [user._id]
        }
        const post = await data.posts.create(postData)

        await toggleLike(user._id.toString(), post._id.toString())

        const updatedPost = await data.posts.findById(post._id)
        expect(updatedPost.likes).to.have.length(0)
    })

    it('GIVEN a non existent post id WHEN toggleLike is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await toggleLike(fakeId, fakeId)
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('post not found')
        }
    })
})