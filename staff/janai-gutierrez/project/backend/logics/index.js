import completeQuest from './completeQuest.js'
import createQuest from './createQuest.js'
import deleteQuest from './deleteQuest.js'
import getAllQuests from './getAllQuests.js'
import getUserProfile from './getUserProfile.js'
import loginUser from './loginUser.js'
import registerUser from './registerUser.js'

const logic = {
    loginUser,
    registerUser,
    createQuest,
    getUserProfile,
    getAllQuests,
    completeQuest,
    deleteQuest
}

export default logic