import getLoggedUserAvatar from "./getLoggedUserAvatar";
import getLoggedUserUsername from "./getLoggedUserUsername";
import isUserLoggedIn from "./isUserLoggedIn";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import registerUser from "./registerUser";
import updateAvatar from "./updateAvatar";
import updateBio from "./updateBio";
import updateUsername from "./updateUsername";

const users = {
    getLoggedUserUsername,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    updateAvatar,
    updateBio,
    updateUsername,
    getLoggedUserAvatar
}

export default users