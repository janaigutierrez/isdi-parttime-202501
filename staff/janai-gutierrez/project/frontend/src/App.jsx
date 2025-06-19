import { useState, useEffect } from "react"
import logics from "./logic"
import Header from "./components/common/Header"
import { useLocation, useNavigate } from "react-router-dom"
import Private from "./routes/Private"
import Public from "./routes/Public"
import { isAuthenticated } from "./logic/helpers/getLoggedUserId"
import './index.css'

const App = () => {
    const [refreshHeader, setRefreshHeader] = useState(Date.now())
    const [isUserLogged, setIsUserLogged] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const onLogoutClick = () => {
        logics.user.logoutUser()
        setIsUserLogged(false)
        setRefreshHeader(Date.now())
        navigate("/")
    }

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = isAuthenticated()
            setIsUserLogged(isAuth)
        }
        checkAuth()
    }, [location.pathname, refreshHeader])

    return (
        <>
            {isUserLogged ? (
                <Private
                    setRefreshHeader={setRefreshHeader}
                    logout={onLogoutClick}
                />
            ) : (
                <>
                    <Public setRefreshHeader={setRefreshHeader} />
                </>
            )}
        </>
    )
}

export default App