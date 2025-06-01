import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import createPost from "./createPost.js"

describe('createPost', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN an existent user and valid data for a post WHEN createPost is called adds a document to the post collection THEN you can find the post on the DB', async () => {
        const userData = {
            username: 'Test-1',
            password: 'Test1!',
            email: 'email@mail.com'
        }
        const user = await data.users.create(userData)

        await createPost(user._id.toString(), 'post-1-test', 'post-1-content-test', 'this.link/image.png')

        const userPosts = await data.posts.find({ author: user._id })
        expect(userPosts).to.be.an('array')
        expect(userPosts.length).to.equal(1)
        expect(userPosts[0].title).to.equal('post-1-test')
        expect(userPosts[0].description).to.equal('post-1-content-test')
        expect(userPosts[0].img).to.equal('this.link/image.png')
        expect(userPosts[0].likes).to.be.an('array')
        expect(userPosts[0].likes).to.be.empty
        expect(userPosts[0].createdAt).to.exist
    })

    it('GIVEN a non existent user id WHEN createPost is called it does not find the author THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await createPost(fakeId.toString())
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.be.a('string')
            expect(error.message).to.equal('user not found')
        }
    })
})