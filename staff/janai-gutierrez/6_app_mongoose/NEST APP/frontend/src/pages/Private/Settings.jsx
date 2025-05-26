import { useState } from 'react'
import './MyProfileSettings.css'
import logics from '../../logic'
import Form from '../../components/lib/Form'
import getLoggedUserId from '../../logic/helpers/getLoggedUserId'
import { useNavigate } from "react-router"

const Settings = () => {
    const [showNewEmailForm, setShowNewEmailForm] = useState(false)
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false)
    const [showDeleteAccountForm, setShowDeleteAccountForm] = useState(false)
    const navigate = useNavigate()

    const emailObject = { label: 'Email', inputType: 'email', inputPlaceholder: 'my_new@email.com', inputId: 'email', isRequired: true }

    const oldPasswordObject = { label: 'Enter your current password', inputType: 'password', inputPlaceholder: '·········', inputId: 'old-password', isRequired: true }
    const newPasswordObject = { label: 'New password', inputType: 'password', inputPlaceholder: '·········', inputId: 'new-password', isRequired: true }
    const newPasswordConfirmObject = { label: 'Confirm your new password', inputType: 'password', inputPlaceholder: '·········', inputId: 'confirm-password', isRequired: true }

    const passwordObject = { label: 'Enter your password to delete your account', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }

    const onUpdateEmail = (formData, onSuccess) => {
        const newEmail = formData.email

        try {
            logics.users.updateEmail(newEmail)
                .then(() => {
                    console.log('✅ Email actualizado')
                    alert('Email updated successfully')
                    onSuccess()
                })
                .catch(error => {
                    console.error('❌ Error actualizando email:', error)
                    alert('ups, try again')
                })
        } catch (error) {
            console.error('❌ Error en updateEmail:', error)
            alert('ups! try again!')
        }
    }

    const onUpdatePassword = (formData, onSuccess) => {
        const oldPassword = formData['old-password']
        const newPassword = formData['new-password']
        const confirmPassword = formData['confirm-password']

        try {
            logics.users.updatePassword(newPassword, confirmPassword, oldPassword)
                .then(() => {
                    console.log('✅ Password actualizada')
                    alert('Password updated successfully')
                    setShowNewPasswordForm(false)
                    onSuccess()
                })
                .catch(error => {
                    console.error('❌ Error actualizando password:', error)
                    alert('ups, try again')
                })
        } catch (error) {
            console.error('❌ Error en updatePassword:', error)
            alert('ups! try again!')
        }
    }

    const onDeleteAccount = (formData, onSuccess) => {
        console.log('🔍 formData completo:', formData)
        console.log('🔍 formData.password:', formData.password)
        try {
            const doesUserAgree = confirm("If you delete your account you will delete all your post and everything you ever 'liked'. Continue?")
            if (doesUserAgree) {
                logics.users.deleteUser(formData.password)
                    .then(() => {
                        console.log('✅ Usuario eliminado')
                        alert('Account deleted successfully!')
                        logics.users.logoutUser()
                        navigate('/register')
                        onSuccess()
                    })
                    .catch(error => {
                        console.error('❌ Error eliminando usuario:', error)
                        alert('ups, try again')
                    })
            }
        } catch (error) {
            console.error('❌ Error en deleteAccount:', error)
            alert('ups, try again')
        }
    }

    return <div className='main-container'>
        <div className='settings__section-title' onClick={() => setShowNewEmailForm(!showNewEmailForm)}>
            <h2>Update my email</h2>
            <i className={`bi bi-chevron-compact-${showNewEmailForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showNewEmailForm && <Form
                inputsArray={[emailObject]}
                submitButtonText={'Save new email'}
                onSubmitCallback={onUpdateEmail}
            />
        }
        <div className='settings__section-title' onClick={() => setShowNewPasswordForm(!showNewPasswordForm)}>
            <h2>Update my password</h2>
            <i className={`bi bi-chevron-compact-${showNewPasswordForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showNewPasswordForm && <Form
                inputsArray={[oldPasswordObject, newPasswordObject, newPasswordConfirmObject]}
                submitButtonText={'Save new password'}
                onSubmitCallback={onUpdatePassword}
            />
        }
        <div className='settings__section-title' onClick={() => setShowDeleteAccountForm(!showDeleteAccountForm)}>
            <h2>Delete my account</h2>
            <i className={`bi bi-chevron-compact-${showDeleteAccountForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showDeleteAccountForm && <Form
                inputsArray={[passwordObject]}
                submitButtonText={'Delete my account'}
                onSubmitCallback={onDeleteAccount}
            />
        }
    </div>
}

export default Settings