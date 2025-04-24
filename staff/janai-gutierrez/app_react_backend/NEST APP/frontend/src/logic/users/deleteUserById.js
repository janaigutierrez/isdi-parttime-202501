import data from "../../data"
import { AuthError, ExistenceError } from "common/errors"
import validator from "common"

const deleteUserById = (id, password) => {
    validator.id(id)
    validator.password(password)

    const user = data.users.findUserById(id)

    if (!user) throw new ExistenceError('user not found')
    if (user.password !== password) throw new AuthError('incorrect password')

    const userPosts = data.posts.retrievePostsByAuthorId(id)

    userPosts.forEach(post => {
        data.posts.deletePostById(post.id)
    });

    //TODO: Delete likes gived by the user

    data.users.deleteUserById(id)
}

export default deleteUserById