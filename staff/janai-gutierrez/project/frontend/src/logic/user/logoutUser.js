const logout = () => {
    localStorage.removeItem('authToken')
    return true
}

export default logout