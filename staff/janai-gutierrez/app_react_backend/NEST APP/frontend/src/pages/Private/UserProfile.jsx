import { useEffect, useState } from "react"
import UserCard from "../../components/UserCard"
import PostList from "../../components/PostList"
import logics from "../../logic"
import { useParams } from "react-router"
import { errors, validator } from "common"
import NotFound from "../NotFound"

const UserProfile = () => {
    const [posts, setPosts] = useState()
    const [userId, setUserId] = useState()
    const [loading, setLoading] = useState(true)
    const [refreshPosts, setRefreshPosts] = useState(Date.now())
    const { username } = useParams()

    useEffect(() => {
        setLoading(true)

        logics.users.getUserIdByUsername(username, (error, retrievedId) => {
            if (error) {
                if (error instanceof errors.ExistenceError) {
                    setUserId('not-found')
                } else {
                    alert('ups, something is not working!')
                    console.error(error)
                }
                setLoading(false)
                return
            }
            setUserId(retrievedId)
            logics.posts.getPostsByAuthor(retrievedId, (postsError, retrievedPosts) => {
                if (postsError) {
                    console.error('Error retrieving posts:', postsError)
                    setPosts([])
                } else {
                    setPosts(retrievedPosts || [])
                }
                setLoading(false)
            })
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