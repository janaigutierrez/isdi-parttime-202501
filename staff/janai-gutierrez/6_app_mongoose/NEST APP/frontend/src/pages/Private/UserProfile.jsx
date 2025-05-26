import { useEffect, useState } from "react"
import UserCard from "../../components/UserCard"
import PostList from "../../components/PostList"
import logics from "../../logic"
import { useParams } from "react-router"
import { errors, validator } from "common"
import NotFound from "../NotFound"

const UserProfile = () => {
    const [posts, setPosts] = useState([])
    const [userId, setUserId] = useState()
    const [loading, setLoading] = useState(true)
    const [refreshPosts, setRefreshPosts] = useState(Date.now())
    const { username } = useParams()

    useEffect(() => {
        setLoading(true)

        logics.users.getUserIdByUsername(username)
            .then(retrievedId => {
                console.log('✅ User ID obtenido:', retrievedId)
                setUserId(retrievedId)
                return logics.posts.getPostsByAuthor(retrievedId)
            })
            .then(retrievedPosts => {
                console.log('✅ Posts del usuario cargados:', retrievedPosts?.length || 0)
                setPosts(retrievedPosts || [])
                setLoading(false)
            })
            .catch(error => {
                console.error('❌ Error en UserProfile:', error)
                if (error instanceof errors.ExistenceError) {
                    setUserId('not-found')
                } else {
                    alert('ups, something is not working!')
                    setPosts([])
                }
                setLoading(false)
            })

    }, [username, refreshPosts])

    if (loading) return <div>Loading...</div>

    return <>
        {
            userId === 'not-found' ? <NotFound />
                :
                <div className="main-container">
                    {
                        userId && <UserCard userId={userId} />
                    }
                    {
                        posts && <PostList posts={posts} setRefreshPosts={setRefreshPosts} handleNavigateToUserProfile={setRefreshPosts} />
                    }
                </div>
        }
    </>
}
export default UserProfile