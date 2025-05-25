import { useState, useEffect } from "react"
import logics from "./logic/users/index"
import Header from "./components/Header"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Private from "./pages/Private"
import Public from "./pages/Public"
import './index.css'

const App = () => {
    const [refreshHeader, setRefreshHeader] = useState(Date.now())
    const [isUserLogged, setIsUserLogged] = useState(logics.isUserLoggedIn())
    const location = useLocation()
    const navigate = useNavigate()

    const onLogoutClick = () => {
        logics.logoutUser()
        setIsUserLogged(logics.isUserLoggedIn())
        setRefreshHeader(Date.now())
        navigate("/")
    }

    useEffect(() => {
        setIsUserLogged(logics.isUserLoggedIn())
    }, [location.pathname])

    return <>
        <Header
            isUserLogged={isUserLogged}
            refreshHeader={refreshHeader}
            logout={onLogoutClick}
        />
        {isUserLogged ? <Private setRefreshHeader={setRefreshHeader} /> : <Public setRefreshHeader={setRefreshHeader} />}
    </>
}

export default App