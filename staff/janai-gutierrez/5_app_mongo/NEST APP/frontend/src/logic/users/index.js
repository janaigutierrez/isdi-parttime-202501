import getUserIdByUsername from "./getUserIdByUsername";
import isUserLoggedIn from "./isUserLoggedIn";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import registerUser from "./registerUser";
import updateAvatar from "./updateAvatar";
import updateBio from "./updateBio";
import updateEmail from "./updateEmail";
import updatePassword from "./updatePassword";
import updateUsername from "./updateUsername";
import getRandomBio from "./getRandomBio";
import deleteUser from "./deleteUser";
import getAvatar from "./getUserAvatar";
import getBio from "./getBio";
import getUserUsername from "./getUserUsername";
import getUserMainInfo from "./getUserMainInfo";


const users = {
    getUserUsername,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    updateAvatar,
    updateBio,
    updateUsername,
    getAvatar,
    getBio,
    getUserIdByUsername,
    updatePassword,
    updateEmail,
    deleteUser,
    getRandomBio,
    getUserMainInfo,
}

export default users