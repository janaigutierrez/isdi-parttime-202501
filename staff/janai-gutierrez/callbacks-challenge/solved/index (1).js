import {
    buyPopcorn,
    buyTicket,
    decideToGoToTheMovies,
    dressUp,
    eatPopcorn,
    pay,
    searchForFriend,
    waitForFriend,
    waitForGreenLight,
    walk,
    watchMovie,
    theresNoPlaceLikeHome,
    ERROR_MSG,
} from './core.js';


//1. Decidir ir al cine (decideToGoToTheMovies)
//2. Busca a alguien que se apunte al plan (searchForFriend)
//3. Ponte algo de ropa (dressUp)
//4. camina al cine (walk) + espera un semaforo (waitForGreenLight) + sigue caminando (walk)
//5. espera a tu acompañante (waitForFriend)
//6. compra la entrada (buyTicket) + pagala (pay)
//7. compra palomitas (buyPopcorn) + pagalas (pay)
//8. comete las palomitas
//9. mira la peli
//10. vuelve a casa (camina+semaforo+camina de nuevo)
//11. Celebra que estas en casa (theresNoPlaceLikeHome)

const showError = (message) => {
    console.log(message)
    console.log(ERROR_MSG)
}


const yourAverageSaturdayAfternoon = () => {
    try {
        decideToGoToTheMovies()
        searchForFriend((error, success) => {
            if (error) showError(error.message)
            else {
                console.log(success)
                try {
                    dressUp()
                    walk()
                    waitForGreenLight((error, success) => {
                        if (error) showError(error.message)
                        else {
                            console.log(success)
                            try {
                                walk()
                                waitForFriend((error, success) => {
                                    if (error) showError(error.message)
                                    else {
                                        console.log(success)
                                        buyTicket((error, success) => {
                                            if (error) showError(error.message)
                                            else {
                                                console.log(success)
                                                try {
                                                    pay()
                                                    buyPopcorn((error, success) => {
                                                        if (error) showError(error.message)
                                                        else {
                                                            console.log(success)
                                                            try {
                                                                pay()
                                                                eatPopcorn()
                                                                watchMovie((error, success) => {
                                                                    if (error) showError(error.message)
                                                                    else {
                                                                        console.log(success)
                                                                        try {
                                                                            walk()
                                                                            waitForGreenLight((error, success) => {
                                                                                if (error) showError(error.message)
                                                                                else {
                                                                                    console.log(success)
                                                                                    try {
                                                                                        walk()
                                                                                        theresNoPlaceLikeHome()
                                                                                    } catch (error) {
                                                                                        showError(error.message)
                                                                                    }
                                                                                }
                                                                            })
                                                                        } catch (error) {
                                                                            showError(error.message)
                                                                        }
                                                                    }
                                                                })
                                                            } catch (error) {
                                                                showError(error.message)
                                                            }
                                                        }
                                                    })
                                                } catch (error) {
                                                    showError(error.message)
                                                }

                                            }
                                        })
                                    }
                                })
                            } catch (error) {
                                showError(error.message)
                            }

                        }
                    })
                } catch (error) {
                    showError(error.message)
                }
            }
        })
    } catch (error) {
        showError(error.message)
    }

}

yourAverageSaturdayAfternoon()
