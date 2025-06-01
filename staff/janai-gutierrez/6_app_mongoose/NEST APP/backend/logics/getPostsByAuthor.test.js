import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import getPostsByAuthor from "./getPostsByAuthor.js"

describe('getPostsByAuthor', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN user with posts WHEN getPostsByAuthor is called THEN returns user posts with correct data', async () => {
        // Setup - Crear usuarios
        const userData = { username: 'TestUser', password: 'Test123!', email: 'test@test.com' }
        const otherUserData = { username: 'OtherUser', password: 'Test123!', email: 'other@test.com' }

        const user = await data.users.create(userData)
        const otherUser = await data.users.create(otherUserData)

        // Crear posts del usuario
        const post1 = await data.posts.create({
            title: 'First Post',
            description: 'My first post',
            author: user._id,
            likes: [otherUser._id]  // OtherUser le dio like
        })

        const post2 = await data.posts.create({
            title: 'Second Post',
            description: 'My second post',
            author: user._id,
            likes: [user._id]  // User se dio like a sí mismo
        })

        // Post de otro usuario (no debe aparecer)
        await data.posts.create({
            title: 'Other Post',
            author: otherUser._id
        })

        const userPosts = await getPostsByAuthor(user._id.toString())

        expect(userPosts).to.exist
        expect(userPosts).to.be.an('array')
        expect(userPosts).to.have.lengthOf(2)  // Solo posts del usuario

        // Verificar orden (más recientes primero)
        expect(userPosts[0].title).to.equal('Second Post')
        expect(userPosts[1].title).to.equal('First Post')

        // Verificar estructura y populate del autor
        const firstPost = userPosts[0]
        expect(firstPost).to.have.property('title')
        expect(firstPost).to.have.property('description')
        expect(firstPost).to.have.property('author')
        expect(firstPost.author).to.have.property('username')
        expect(firstPost.author.username).to.equal('TestUser')
        expect(firstPost.author).to.not.have.property('password')  // No debe incluir password

        // Verificar isLiked functionality
        expect(firstPost).to.have.property('isLiked')
        expect(firstPost.isLiked).to.be.true   // User se dio like
        expect(userPosts[1].isLiked).to.be.false  // User no se dio like al primer post

        // Verificar fecha formateada
        expect(firstPost).to.have.property('createdOn')
        expect(firstPost.createdOn).to.be.a('string')
    })

    it('GIVEN user with no posts WHEN getPostsByAuthor is called THEN returns empty array', async () => {
        const userData = { username: 'TestUser', password: 'Test123!', email: 'test@test.com' }
        const user = await data.users.create(userData)

        const userPosts = await getPostsByAuthor(user._id.toString())

        expect(userPosts).to.exist
        expect(userPosts).to.be.an('array')
        expect(userPosts).to.have.lengthOf(0)
    })

    it('GIVEN non-existent user WHEN getPostsByAuthor is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await getPostsByAuthor(fakeId)
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('author not found')
        }
    })

    it('GIVEN invalid user ID format WHEN getPostsByAuthor is called THEN throws ContentError', async () => {
        try {
            const invalidId = 'invalid-id-format'
            await getPostsByAuthor(invalidId)
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError)
            expect(error.message).to.equal('Invalid ID format')
        }
    })
})