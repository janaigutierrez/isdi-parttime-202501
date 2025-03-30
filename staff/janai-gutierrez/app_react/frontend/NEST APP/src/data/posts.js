const posts = {
    createPost: (post) => { 
        const postsJson = localStorage.posts
        let posts;
        if (!postsJson) {
            posts = [];
        } else {
            posts = JSON.parse(postsJson)
        }

        post.createdOn = new Date();
        post.id = Date.now()
        post.likes = []

        posts.push(post)

        localStorage.posts = JSON.stringify(posts)

    },
    retrievePosts: () => {
        const posts = localStorage.posts ? JSON.parse(localStorage.getItem("posts")) : [];

        return posts
    },
    updatePostById: (id, newPostData) => {
        const posts = localStorage.posts ? JSON.parse(localStorage.getItem("posts")) : [];
        const postIndex = posts.findIndex(post => post.id === id)
        if (postIndex === -1) {
            return
        }

        posts[postIndex] = newPostData

        localStorage.posts = JSON.stringify(posts)
    },
    findPostById: (id) => {
        const posts = localStorage.posts ? JSON.parse(localStorage.getItem("posts")) : [];
        const post = posts.find(post => post.id === id)
        return post
    }
}

export default posts