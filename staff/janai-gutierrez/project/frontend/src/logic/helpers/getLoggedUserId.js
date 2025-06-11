/**
 * Get the JWT token from localStorage
 * @returns {string|null} JWT token or null if not logged in
 */

const getLoggedUserId = () => {
    try {
        const token = localStorage.getItem('authToken')

        if (!token) {
            return null
        }

        const tokenParts = token.split('.')
        if (tokenParts.length !== 3) {
            localStorage.removeItem('authToken')
            return null
        }

        try {
            const payload = JSON.parse(atob(tokenParts[1]))
            const currentTime = Math.floor(Date.now() / 1000)

            if (payload.exp && payload.exp < currentTime) {
                localStorage.removeItem('authToken')
                return null
            }
        } catch (parseError) {
            localStorage.removeItem('authToken')
            return null
        }

        return token
    } catch (error) {
        console.error('Error getting logged user token:', error)
        return null
    }
}

export default getLoggedUserId