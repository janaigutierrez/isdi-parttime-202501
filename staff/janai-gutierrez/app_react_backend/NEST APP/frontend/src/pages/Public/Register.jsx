import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/lib/Form";
import logics from "../../logic";
import { errors } from "common";

const Register = ({ setRefreshHeader }) => {
    const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    const objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '·········', inputId: 'passwordConfirmation', isRequired: true }
    const navigate = useNavigate()

    const onRegisterUser = (formData, onSuccess) => {
        try {
            logics.users.registerUser(formData, (error) => {
                if (error) alert(error)
                else {
                    logics.users.loginUser(formData, (error) => {
                        if (error) {
                            alert(error)

                        } else {
                            navigate('/')
                            setRefreshHeader(Date.now())
                            onSuccess()
                        }

                    })
                }
            })

        } catch (error) {
            alert('check your form data, something went wrong')
            console.error(error)
        }

    }


    return <div className="main-container">
        <h1>Register</h1>
        <Form inputsArray={[objectEmail, objectPassword, objectConfirmPassword]} submitButtonText={'Register'} onSubmitCallback={onRegisterUser} />
        <div className="register__login">
            <span className="register__login--text">Already have an account?</span>
            <span className="register__login--button"><Link to="/login">Go to login!</Link></span>
        </div>
    </div>
}


export default Register