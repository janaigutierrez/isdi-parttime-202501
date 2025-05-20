import data from "../../data";
import { errors, validator } from "common"

const getUserBioById = (id, callback) => {
    try {
        validator.id(id)
        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(null, xhr.responseText)
                } else if (xhr.status === 404) {
                    callback(new errors.ExistenceError('user not found'))
                } else {
                    try {
                        const response = JSON.parse(xhr.responseText)
                        callback(new Error(response.message || `Error ${xhr.status}`))
                    } catch (error) {
                        callback(new Error(`Error ${xhr.status}: ${xhr.statusText}`))
                    }
                }
            }
        }


        xhr.open('GET', `${import.meta.env.VITE_NEST_APP}/users/bio`)
        xhr.setRequestHeader('Authorization', `Bearer ${id}`)
        xhr.send()
    } catch (error) {
        callback(error)
    }
}

export default getUserBioById