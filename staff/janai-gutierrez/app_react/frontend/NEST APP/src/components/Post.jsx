import logics from "../logic"
import './Post.css'

const Post = ({ postData, onLikePost }) => {
    const handleLikePost = (id) => {
        try {
            logics.posts.toggleLike(id)
            onLikePost(Date.now())
        } catch (error) {
            alert('smething went wrong :s')
            console.error(error)
        }
    }

    return <div  className='post-card'>
        <p className='post-card__author'>
            {`${postData.author} said on ${postData.createdOn}`}
        </p>
        <h3 className='post-card__title'>{postData.title}</h3>
        <p className='post-card__description'>{postData.description}</p>
        {
            postData.img && <div className='post-card__img-container'>
                <img className='post-card__image' src={postData.img} />
            </div>
        }

        <div className='post-card__like'>
            <span onClick={() => handleLikePost(postData.id)} className='post-card__like-btn'>
                {
                    postData.isLiked ?
                    <i className='bi bi-heart-fill'></i>
                    :
                    <i className='bi bi-heart'></i>
                }
            </span>

            <p>{postData.likes.length}</p>

        </div>

    </div>

}

export default Post