import { useState, useEffect } from "react"
import logics from "../logic"
import Post from "./Post"
import "./PostList.css"

const PostList = ({ refreshPosts, setRefreshPosts }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            const retrievedPosts = logics.posts.getAllPosts()
            setPosts(retrievedPosts)
        } catch (error) {
            alert('ups, something went wrong :s')
            console.error(error)
        }
    }, [refreshPosts])

    return <div className='posts'>
        {
            posts.map((post, index) => {
                return <Post key={index} postData={post} onLikePost={setRefreshPosts} />
            })
        }
    </div>
}

export default PostList