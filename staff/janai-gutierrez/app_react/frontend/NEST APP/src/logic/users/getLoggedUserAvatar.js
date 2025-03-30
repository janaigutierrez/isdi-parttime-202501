import data from "../../data";
import { ExistenceError } from "../../utils/errors";
import validator from "../../utils/validators";
import getLoggedUserId from "../helpers/getLoggedUserId";

const getLoggedUserAvatar = () => {
    const loggedUserId = getLoggedUserId()

    validator.id(loggedUserId)

    const userLogged = data.users.findUserById(loggedUserId)

    if (!userLogged) throw new ExistenceError('user not found')
    return userLogged.avatar
}

export default getLoggedUserAvatar