import { errors, validator } from 'common'
import data from '../../data'
import getLoggedUserId from '../helpers/getLoggedUserId'


function getUserUsernameById(id, callback) {
    try {
        validator.id(id)
    } catch (error) {
        return callback(error)
    }
    const xhr = new XMLHttpRequest()

    xhr.open('GET', `${import.meta.env.VITE_NEST_APP}/users/username`, true)

    xhr.setRequestHeader('Authorization', `Basic ${getLoggedUserId()}`)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const username = xhr.response
                console.log(username)
                callback(null, username)
            } else {
                const response = JSON.parse(xhr.response)
                if (errors[response.name]) callback(new errors[response.name](response.message))
                else callback(new errors.ExistenceErrorError(`${response.name}: ${response.message}`))
            }


        }

    }
    xhr.send()
}
export default getUserUsernameById
