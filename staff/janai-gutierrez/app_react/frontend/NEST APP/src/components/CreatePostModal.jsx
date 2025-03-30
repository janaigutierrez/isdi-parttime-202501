import logics from "../logic"
import Btn from "./lib/Btn"
import Form from "./lib/Form"

const CreatePostModal = ({ setRefreshPosts, closeModal }) => {
    const titleInput = { label: 'Add your title', inputType: 'text', inputPlaceholder: 'Title...', inputId: 'title', isRequired: true }
    const descriptionInput = { label: 'Add your description', inputType: 'text', inputPlaceholder: 'Add text...', inputId: 'desription', isRequired: true }
    const imgInput = { label: 'Add ur image url', inputType: 'url', inputPlaceholder: '.png, .jpg, etc', inputId: 'img', isRequired: false }

    const handlePublishPost = (formData) => {
        try {
            logics.posts.publishPost(formData)
            setRefreshPosts(Date.now())
            closeModal()
        } catch (error) {
            alert('ups, something went wrong :c')
            console.error(error)
        }
    }

    return <div className='home__create-post-dialog'>
        <Btn btnClassnames={'home__close-form-button'} btnCallback={closeModal} btnContent={'X'} />
        <h2> What would you like to share?</h2>
        <Form inputsArray={[titleInput, descriptionInput, imgInput]} submitButtonText={'Post'} onSubmitCallback={handlePublishPost} />
    </div>
}

export default CreatePostModal;
