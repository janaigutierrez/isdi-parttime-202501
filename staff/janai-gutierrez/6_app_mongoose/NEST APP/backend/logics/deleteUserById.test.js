import { describe } from "mocha"
import { data } from "../data/index.js"
import "dotenv/config"
import { assert, expect, should } from "chai"
import { errors } from "common"
import deleteUserById from "./deleteUserById.js"

describe('deleteUserById', () => {
    before(() => {
        return data.connect()
    })

    afterEach(() => {
        return data.users.deleteMany()
            .then(() => {
                return data.posts.deleteMany()
            })
    })

    it('GIVEN an existent user with valid password WHEN deleteUserById is called THEN removes user and their posts from DB', async () => {
        // Setup: crear usuario y post
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
        await data.posts.create(postData)

        // Test: eliminar usuario
        await deleteUserById(user._id.toString(), 'Test123!')

        // Verificar usuario eliminado
        const deletedUser = await data.users.findById(user._id)
        expect(deletedUser).to.be.null

        // Verificar posts eliminados
        const userPosts = await data.posts.find({ author: user._id })
        expect(userPosts).to.be.an('array')
        expect(userPosts).to.be.empty
    })

    it('GIVEN a non existent user id WHEN deleteUserById is called THEN throws ExistenceError', async () => {
        try {
            const fakeId = '507f1f77bcf86cd799439011'
            await deleteUserById(fakeId, 'password123')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('GIVEN an existent user with wrong password WHEN deleteUserById is called THEN throws AuthError', async () => {
        // Setup: crear usuario
        const userData = {
            username: 'Test-User',
            password: 'Test123!',
            email: 'test@mail.com'
        }
        const user = await data.users.create(userData)

        try {
            await deleteUserById(user._id.toString(), 'wrongpassword')
            expect.fail('Should have thrown error')
        } catch (error) {
            expect(error).to.be.instanceOf(errors.AuthError)
            expect(error.message).to.equal('wrong password')
        }
    })
})