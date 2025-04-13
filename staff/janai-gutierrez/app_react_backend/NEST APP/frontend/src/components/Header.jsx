import { useState, useEffect } from "react"
import Btn from "./lib/Btn.jsx"
import Logo from "./lib/Logo.jsx"
import logics from "../logic/index.js"
import './Header.css'
import getLoggedUserId from "../logic/helpers/getLoggedUserId.js"
import UserAvatar from "./UserAvatar.jsx"
import { useLocation, useNavigate } from "react-router"
import CelebrationButton from './lib/ConfettiBtn.jsx'


const Header = ({ refreshHeader, logout, isUserLogged }) => {
    const location = useLocation();
    const [username, setUsername] = useState('')
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [path, setPath] = useState('')
    const [justifyItems, setJustifyItems] = useState('')
    const navigate = useNavigate()

    const onLogoutClick = () => {
        setUserMenuOpen(false)
        logout()
    }

    useEffect(() => {
        const pathname = location.pathname
        setPath(pathname)

        if (logics.users.isUserLoggedIn()) {
            setJustifyItems('between')
            const retrivedUsername = logics.users.getUserUsernameById(getLoggedUserId())
            setUsername(retrivedUsername)
            const retrivedAvatar = logics.users.getUserAvatarById(getLoggedUserId())
            setAvatar(retrivedAvatar)
        } else {
            if (pathname === '/login' || pathname === '/register') {
                setJustifyItems('start')
            } else if (pathname === "/") {
                setJustifyItems('end')
            } else {
                setJustifyItems('not-found')
            }
        }
    }, [refreshHeader, location])


    const handleLogoClick = () => {
        navigate("/")
    }

    const onMenuRouteClick = (path) => {
        if (path) navigate(path)
        setUserMenuOpen(false)
    }

    return <header className={`header ${justifyItems}`}>
        {
            ((path === '/register' || path === '/login' || justifyItems === 'not-found') || isUserLogged) && <Logo onClick={handleLogoClick} size="sm" />
        }
        {
            (isUserLogged && username.length > 0) && <p className="header__welcome-text">{`Welcome, ${username}`}</p>

        }
        {
            !isUserLogged && (path === '/' || justifyItems === 'not-found') && <Btn btnClassnames={"header__join-button"} btnContent={"Join in!"} btnCallback={() => navigate('/register')} />
        }
        {
            (((username || avatar) && isUserLogged) &&
                <UserAvatar
                    size={'sm'}
                    avatar={avatar}
                    letter={username[0]}
                    buttonCallback={() => setUserMenuOpen(!isUserMenuOpen)}
                />)
        }
        {
            isUserMenuOpen && <aside className="header__user-menu">
                <Btn btnContent={'Account'} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick('/my-profile')} />
                <Btn btnContent={'Settings'} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick('/settings')} />
                <Btn btnContent={'My Posts'} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick('/my-posts')} />
                <Btn btnContent={'Logout'} btnClassnames={'header__user-menu--button'} btnCallback={onLogoutClick} />
                <CelebrationButton>Festeggia!</CelebrationButton>
            </aside>
        }


    </header>
}

export default Header