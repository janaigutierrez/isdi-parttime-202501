// src/components/Header.jsx
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Btn from "./lib/Btn.jsx"
import Logo from "./lib/Logo.jsx"
import CelebrationButton from "./lib/ConfettiBtn.jsx"
import UserAvatar from "./UserAvatar.jsx"
import logics from "../logic/index.js"
import getLoggedUserId from "../logic/helpers/getLoggedUserId.js"
import "./Header.css"

const Header = ({ refreshHeader, logout, isUserLogged }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [avatar, setAvatar] = useState("")
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)
    const [justifyItems, setJustifyItems] = useState("")

    useEffect(() => {
        const path = location.pathname
        setJustifyItems(
            logics.users.isUserLoggedIn()
                ? "between"
                : path === "/login" || path === "/register"
                    ? "start"
                    : path === "/"
                        ? "end"
                        : "not-found"
        )

        if (!logics.users.isUserLoggedIn()) return

        const id = getLoggedUserId()

        if (!id || typeof id !== "string") {
            console.error("Invalid user id:", id)
            return
        }

        try {
            // 1) Obtener username
            logics.users.getUserUsername(id)
                .then(name => {
                    setUsername(name)
                    console.log("Username:", name)

                    // 2) Obtener avatar después del username
                    return logics.users.getAvatar(id)
                })
                .then(avatarUrl => {
                    setAvatar(avatarUrl)
                })
                .catch(error => {
                    console.error("Error getting user data:", error)
                })
        } catch (error) {
            console.error("Error in header useEffect:", error)
        }
    }, [refreshHeader, location])

    const onLogoutClick = () => {
        setUserMenuOpen(false)
        logout()
    }

    const onLogoClick = () => navigate("/")

    const onMenuRouteClick = (p) => {
        if (p) navigate(p)
        setUserMenuOpen(false)
    }

    return (
        <header className={`header ${justifyItems}`}>
            {/* Logo sempre visible a register/login/not-found o quan l'usuari estigui loggejat */}
            {((justifyItems === "not-found" || isUserLogged) && (
                <Logo onClick={onLogoClick} size="sm" />
            )) ||
                ((justifyItems === "start" || justifyItems === "end") && (
                    <Logo onClick={onLogoClick} size="sm" />
                ))}

            {/* Missatge de benvinguda */}
            {username && isUserLogged && (
                <p className="header__welcome-text">Welcome, {username}</p>
            )}

            {/* Botó "Join in!" si no està loggejat */}
            {!isUserLogged && justifyItems === "end" && (
                <Btn
                    btnClassnames="header__join-button"
                    btnContent="Join in!"
                    btnCallback={() => navigate("/register")}
                />
            )}

            {/* Avatar i menú */}
            {isUserLogged && (username || avatar) && (
                <UserAvatar
                    size="sm"
                    avatar={avatar}
                    letter={username?.[0]}
                    buttonCallback={() => setUserMenuOpen((o) => !o)}
                />
            )}

            {isUserMenuOpen && (
                <aside className="header__user-menu">
                    <Btn
                        btnContent="Account"
                        btnClassnames="header__user-menu--button"
                        btnCallback={() => onMenuRouteClick("/my-profile")}
                    />
                    <Btn
                        btnContent="Settings"
                        btnClassnames="header__user-menu--button"
                        btnCallback={() => onMenuRouteClick("/settings")}
                    />
                    <Btn
                        btnContent="My Posts"
                        btnClassnames="header__user-menu--button"
                        btnCallback={() => onMenuRouteClick("/my-posts")}
                    />
                    <Btn
                        btnContent="Logout"
                        btnClassnames="header__user-menu--button"
                        btnCallback={onLogoutClick}
                    />
                    <CelebrationButton>Festeggia!</CelebrationButton>
                </aside>
            )}
        </header>
    )
}

export default Header