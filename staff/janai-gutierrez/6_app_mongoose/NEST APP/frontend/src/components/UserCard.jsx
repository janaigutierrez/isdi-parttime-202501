import { useEffect, useState } from "react"
import logics from "../logic"
import getLoggedUserId from "../logic/helpers/getLoggedUserId"
import UserAvatar from "./UserAvatar"
import './UserCard.css'

const UserCard = ({ userId, refreshSelf, tempAvatar }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        // ✅ MIGRADO A PROMISES - MUCHO MÁS LIMPIO
        Promise.all([
            logics.users.getUserUsername(userId),
            logics.users.getBio(userId),
            logics.users.getAvatar(userId)
        ])
            .then(([username, bio, avatar]) => {
                console.log('✅ Datos del usuario cargados:', { username, bio, avatar: !!avatar })
                setUser({
                    username,
                    bio: bio || '',
                    avatar: avatar || null
                })
                setLoading(false)
            })
            .catch(error => {
                console.error('❌ Error cargando datos del usuario:', error)
                setError(error)
                setLoading(false)
            })
    }, [userId, refreshSelf])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return <div className="user-card">
        {
            user && <div className="user-card__username-avatar">
                <UserAvatar
                    avatar={tempAvatar ? tempAvatar : user.avatar}
                    letter={user.username?.[0]}
                    size={'lg'}
                />
                <h2>{user.username}</h2>
            </div>
        }
        {(user && user.bio) && <p className="user-card__bio">
            <i className="bi bi-info-circle"></i>{user.bio}
        </p>}
    </div>
}

export default UserCard