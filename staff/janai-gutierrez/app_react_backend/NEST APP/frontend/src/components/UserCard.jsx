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

        const userData = {}
        let pendingCallbacks = 3

        const checkComplete = () => {
            pendingCallbacks--
            if (pendingCallbacks === 0) {
                setUser(userData)
                setLoading(false)
            }
        }
        logics.users.getUserUsernameById(userId, (err, username) => {
            if (err) {
                console.error('Error retrieving username:', err)
                setError(err)
            } else {
                userData.username = username
            }
            checkComplete()
        })

        logics.users.getUserBioById(userId, (err, bio) => {
            if (err) {
                console.error('Error retrieving bio:', err)
                userData.bio = ''
            } else {
                userData.bio = bio
            }
            checkComplete()

        })
        logics.users.getUserAvatarById(userId, (err, avatar) => {
            if (err) {
                console.error('Error obteniendo avatar:', err)
                userData.avatar = null
            } else {
                userData.avatar = avatar
            }
            checkComplete()
        })
    }, [userId, refreshSelf])

    if (loading) return <div>Loading</div>
    if (error) return <div>Error: {error.message}</div>



    return <div className="user-card">
        {
            user && <div className="user-card__username-avatar">
                <UserAvatar avatar={tempAvatar ? tempAvatar : user.avatar} letter={user.username[0]} size={'lg'} />
                <h2>{user.username}</h2>

            </div>
        }
        {(user && user.bio) && <p className="user-card__bio"><i className="bi bi-info-circle"></i>{user.bio}</p>}
    </div>
}

export default UserCard