import fs from 'fs';
import { errors } from 'common'


const posts = {
    createPost: (post, callback) => {
        fs.readFile('./data/posts.json', (error, data) => {
            if (error) callback(error)
            else {
                let posts = JSON.parse(data);
                if (!posts) users = []
                post.id = Date.now()
                posts.push(user)
                const usersJson = JSON.stringify(users)

                fs.writeFile('./data/posts.json', usersJson, (error) => {
                    if (error) callback(error)
                    else callback(null, user)
                })
            }

        })
    },

    findPosts: (callback) => {
        fs.readFile('./data/posts.json', (error, data) => {
            if (error) callback(error)
            else {
                let posts = JSON.parse(data);
                if (!posts) posts = []
                callback(null, posts)
            }
        })

    },

    findPostById: (id, callback) => {
        fs.readFile('./data/posts.json', (error, data) => {
            if (error) callback(error)
            else {
                let posts = JSON.parse(data);
                if (!posts) posts = []
                const postFound = posts.find(post => post.id === id)
                callback(null, postFound)
            }
        })
    },

    updatePostById: (id, newpostData, callback) => {
        fs.readFile('./data/posts.json', (error, data) => {
            if (error) callback(error)
            else {
                let posts = JSON.parse(data)
                if (!posts) callback(new errors.ExistenceError('post not found'))
                else {
                    const postIndex = posts.findIndex(post => post.id === id)
                    if (postIndex === -1) {
                        callback(new errors.ExistenceError('post not found'))
                    } else {
                        posts[postIndex] = newpostData

                        const postsJson = JSON.stringify(posts)

                        fs.writeFile('./data/posts.json', postsJson, (error) => {
                            if (error) callback(error)
                            else callback(null, newpostData)
                        })
                    }
                }
            }
        })
    }
}
export default users