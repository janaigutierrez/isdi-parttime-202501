import { useEffect, useState } from "react"
import logics from "../../logic"
import getLoggedUserId from "../../logic/helpers/getLoggedUserId"
import PostList from "../../components/PostList"

const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const [refreshPosts, setRefreshPosts] = useState(Date.now())

    useEffect(() => {
        try {
            logics.posts.getPostsByAuthor(getLoggedUserId())
                .then(retrievedPosts => {
                    console.log('✅ Mis posts cargados:', retrievedPosts?.length || 0)
                    setPosts(retrievedPosts || [])
                })
                .catch(error => {
                    console.error('❌ Error cargando mis posts:', error)
                    alert('Error loading your posts')
                    setPosts([])
                })
        } catch (error) {
            console.error('❌ Error en MyPosts useEffect:', error)
            alert('Something went wrong')
            setPosts([])
        }
    }, [refreshPosts])

    return <div className="main-container">
        <PostList posts={posts} setRefreshPosts={setRefreshPosts} isMyPostsPage={true} />
    </div>
}

export default MyPosts