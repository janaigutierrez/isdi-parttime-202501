import { useState, useEffect } from "react"
import pages from "./pages/index"
import logics from "./logic/index"
import Header from "./components/Header"

const { Landing, Home, Login, Register, MyProfile } = pages

const App = () => {
    const [view, setView] = useState(logics.users.isUserLoggedIn() ? 'home' : 'landing') //register, login, home
    const [refreshHeader, setRefreshHeader] = useState(Date.now())

    const navigateToLogin = () => setView('login')
    const navigateToRegister = () => setView('register')
    const navigateToHome = () => setView('home')
    const navigateToLanding = () => setView('landing')
    const navigateToMyProfile = () => setView('account')


    useEffect(() => {
    }, [view])


    return <div className={view}>
        <Header
            currentView={view}
            refreshHeader={refreshHeader}
            handleRegisterClick={navigateToRegister}
            handleLandingClick={navigateToLanding}
            handleAccountClick={navigateToMyProfile}
            handleHomeClick={navigateToHome}
        />
        {view === 'landing' && <Landing />}
        {view === 'register' && <Register handleNavigateToHome={navigateToHome} handleLoginClick={navigateToLogin} />}
        {view === 'login' && <Login handleNavigateToHome={navigateToHome} handleRegisterClick={navigateToRegister} />}
        {view === 'home' && <Home />}
        {view === 'account' && <MyProfile updateHeader={setRefreshHeader} />}
    </div>
}

export default App