import logics from "../logic"
import Btn from "./lib/Btn"
import Form from "./lib/Form"
import { useState } from "react"

const CreatePostModal = ({ setRefreshPosts, closeModal }) => {
    const [isPublishing, setIsPublishing] = useState(false)


    const titleInput = { label: 'Add your title', inputType: 'text', inputPlaceholder: 'Title...', inputId: 'title', isRequired: true }
    const descriptionInput = { label: 'Add your description', inputType: 'text', inputPlaceholder: 'Add text...', inputId: 'description', isRequired: true }
    const imgInput = { label: 'Add ur image url', inputType: 'url', inputPlaceholder: '.png, .jpg, etc', inputId: 'img', isRequired: false }

    const handlePublishPost = (formData) => {
        setIsPublishing(true)

        logics.posts.publishPost(formData, (error) => {
            if (error) {
                alert('ups, smt went wrong')
                console.error(error)
            } else {
                setRefreshPosts(Date.now())
                closeModal()
            }
        })
    }

    return <div className='home__create-post-dialog'>
        <Btn btnClassnames={'home__close-form-button'} btnCallback={closeModal} btnContent={'X'} />
        <h2> What would you like to share?</h2>
        <Form inputsArray={[titleInput, descriptionInput, imgInput]} submitButtonText={'Post'} onSubmitCallback={handlePublishPost} />
    </div>
}

export default CreatePostModal;