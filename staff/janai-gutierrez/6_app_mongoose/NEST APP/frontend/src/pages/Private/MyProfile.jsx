import { useEffect, useState } from "react"
import Form from "../../components/lib/Form"
import logics from "../../logic/index"
import './MyProfileSettings.css'
import UserCard from "../../components/UserCard"
import getLoggedUserId from "../../logic/helpers/getLoggedUserId"
import Btn from "../../components/lib/Btn"

const MyProfile = ({ updateHeader }) => {
    const [showUsernameForm, setShowUsernameForm] = useState(false)
    const [showAvatarForm, setShowAvatarForm] = useState(false)
    const [showBioForm, setShowBioForm] = useState(false)
    const [refreshUserCard, setRefreshUserCard] = useState(Date.now())
    const [tempAvatar, setTempAvatar] = useState()

    const usernameObject = { label: 'Username', inputType: 'text', inputPlaceholder: 'myNewUserName', inputId: 'username', isRequired: true }
    const avatarObject = { label: 'Avatar', inputType: 'file', inputPlaceholder: 'https/new.com/avatar.png', inputId: 'avatar', isRequired: true }
    const bioObject = { label: 'Bio', inputType: 'text-area', inputPlaceholder: 'More about me here!', inputId: 'bio', isRequired: true }

    const onUpdateUsername = (formData, onSuccess) => {
        logics.users.updateUsername(formData['username'])
            .then(() => {
                console.log('✅ Username actualizado')
                updateHeader(Date.now())
                setRefreshUserCard(Date.now())
                setShowUsernameForm(false)
                onSuccess()
            })
            .catch(error => {
                console.error('❌ Error actualizando username:', error)
                alert('ups! try again!')
            })
    }

    const onUpdateAvatar = (formData, onSuccess) => {
        try {
            const newAvatar = formData['avatar']

            if (!newAvatar) {
                alert('Please select an image')
                return
            }

            const image = new FileReader();

            image.onload = () => {
                const base64 = image.result;
                setTempAvatar(base64)

                logics.users.updateAvatar(base64)
                    .then(() => {
                        console.log('✅ Avatar actualizado')
                        updateHeader(Date.now())
                        setRefreshUserCard(Date.now())
                        setShowAvatarForm(false)
                        onSuccess()
                    })
                    .catch(error => {
                        console.error('❌ Error actualizando avatar:', error)
                        alert('ups! try again!')
                    })
            };

            image.readAsDataURL(newAvatar)
        } catch (error) {
            console.error('❌ Error procesando avatar:', error)
            alert('ups! try again!')
        }
    }

    const onUpdateBio = (formData, onSuccess) => {
        logics.users.updateBio(formData['bio'])
            .then(() => {
                console.log('✅ Bio actualizada')
                updateHeader(Date.now())
                setRefreshUserCard(Date.now())
                setShowBioForm(false)
                onSuccess()
            })
            .catch(error => {
                console.error('❌ Error actualizando bio:', error)
                alert('ups! try again!')
            })
    }

    const onRandomBioClick = () => {
        try {
            logics.users.getRandomBio()
                .then(newBio => {
                    console.log('✅ Bio random obtenida:', newBio)
                    return logics.users.updateBio(newBio)
                })
                .then(() => {
                    console.log('✅ Bio random guardada')
                    setRefreshUserCard(Date.now())
                })
                .catch(error => {
                    console.error('❌ Error con bio random:', error)
                    alert('ups, something went wrong')
                })
        } catch (error) {
            console.error('❌ Error en randomBio:', error)
            alert('ups, something went wrong')
        }
    }

    return <div className="main-container">
        <UserCard userId={getLoggedUserId()} refreshSelf={refreshUserCard} tempAvatar={tempAvatar} />
        <div className="account__section-title" onClick={() => setShowUsernameForm(!showUsernameForm)}>
            <h2>Change my username</h2>
            <i className={`bi bi-chevron-compact-${showUsernameForm ? 'up' : 'down'}`}></i>
        </div>
        {showUsernameForm && <Form inputsArray={[usernameObject]} onSubmitCallback={onUpdateUsername} submitButtonText={"Save new username"} />}
        <div className="account__section-title" onClick={() => setShowAvatarForm(!showAvatarForm)}>
            <h2>Change my avatar</h2>
            <i className={`bi bi-chevron-compact-${showAvatarForm ? 'up' : 'down'}`}></i>
        </div>
        {showAvatarForm && <Form inputsArray={[avatarObject]} onSubmitCallback={onUpdateAvatar} submitButtonText={"Save new avatar"} onChangeCallback={setTempAvatar} />}
        <div className="bio-randomizer">
            <div className="account__section-title" onClick={() => setShowBioForm(!showBioForm)}>
                <h2>Change my bio</h2>
                <i className={`bi bi-chevron-compact-${showBioForm ? 'up' : 'down'}`}></i>
            </div>
            {showBioForm && <Form inputsArray={[bioObject]} onSubmitCallback={onUpdateBio} submitButtonText={"Save new bio"} />}
            {showBioForm && <div className="account__bio"><b>No ideas?</b><p>Become random: <Btn btnContent={'Randomize'} btnCallback={onRandomBioClick} btnClassnames={'account__random-bio-btn'} /></p></div>}
        </div>
    </div>
}

export default MyProfile