import data from "../../data"
import { AuthEror, ExistenceError } from "../../utils/errors"
import validator from "../../utils/validators"

const loginUser = (loginData) => { 
    validator.password(loginData['password'])
    validator.email(loginData['email'])

    const userLoginCheckout = data.users.findUserByEmail(loginData['email'])

    if (!userLoginCheckout) throw new ExistenceError('user not found')

    if (userLoginCheckout['password'] !== loginData['password']) {
        throw new AuthEror("wrong credentials")
    }

    if (loginData['remember']) {
        localStorage.id = userLoginCheckout.id
    } else {
        sessionStorage.id = userLoginCheckout.id
    }


}

export default loginUser