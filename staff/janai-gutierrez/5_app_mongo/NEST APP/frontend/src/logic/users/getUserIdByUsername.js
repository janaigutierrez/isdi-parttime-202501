import data from "../../data";
import { errors, validator } from "common"

const getUserIdByUsername = (username) => {
    validator.username(username)

    const user = data.users.findUserByUsername(username)

    if (!user) throw new ExistenceError('user not found')
    return user.id
}

export default getUserIdByUsername