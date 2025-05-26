const isUserLoggedIn = () => {
    if (localStorage.getItem('id')) {
        return true
    }
    if (sessionStorage.getItem('id')) {
        return true
    }
    return false
}

export default isUserLoggedIn