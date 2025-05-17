
import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateBio = (newBio, callback) => {
    try {
        validator.text(newBio, 200, 0, 'bio')

        const loggedUserId = getLoggedUserId()
        console.log('Logged user ID:', loggedUserId)
        console.log('Type of ID:', typeof loggedUserId)

        validator.id(loggedUserId)

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log('Response status:', xhr.status)
                console.log('Response text:', xhr.responseText)
                if (xhr.status === 200) {
                    console.log('Bio updated succesfully')
                    callback(null)
                } else {
                    console.error('Error updating bio:', xhr.status)
                    try {
                        const response = JSON.parse(xhr.response)
                        if (errors[response.name]) {
                            callback(new errors[response.name](response.message))
                        } else {
                            callback(new Error(`${response.name}: ${response.message}`))
                        }
                    } catch (error) {
                        callback(new Error(`Error ${xhr.status}: ${xhr.statusText}`))
                    }
                }
            }
        }

        const payload = { bio: newBio }
        console.log('Sending payload:', JSON.stringify(payload))

        xhr.open('PATCH', `${import.meta.env.VITE_NEST_APP}/users/bio`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${loggedUserId}`)
        xhr.send(JSON.stringify(payload))

    } catch (error) {
        callback(error)
    }
}

export default updateBio