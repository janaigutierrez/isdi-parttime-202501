const ERROR_CHANCE = 0.2 //Puedes tocar este valor si pasan errores demasiado a menudo, pero esta prohibido tenerlo en 0 todo el rato

// Puedes cambiar este mensaje por lo que quieras, si te apetece
export const ERROR_MSG = 'Mejor olvidar todo esto y tumbarte en la cama a ver shorts de Juego de Tronos por youtube. Con cinco más ya te habrás visto la temporada 1 entera.'


// Desde aquí esta modificar el código, ¡¡todas estas funciones se quedan como estan!!

// Funciones sincronas
export const decideToGoToTheMovies = () => {
    if (Math.random() < ERROR_CHANCE) {
        throw new Error('¡Parece ser que tu cerebro ya no recuerda como tomar decisiones!')
    } else {
        console.log('Has decidido ir al cine.')
    }
}

export const dressUp = () => {
    if (Math.random() < ERROR_CHANCE) {
        throw new Error('No creo que esas mangas sean para las piernas. Malditas chaquetas y pantalones que se parecen tanto.')
    } else {
        console.log('Pantalones en las piernas, camiseta con los dos brazos pasados... ¡te has puesto hasta zapatos!')
    }
}

export const walk = () => {
    if (Math.random() < ERROR_CHANCE) {
        throw new Error('Has resbalado con los restos de algún perro con indigestión y luego te ha atropellado un patinete electrico. Qué humillante.')
    } else {
        console.log('Pierna derecha, pierna izquierda, pierna derecha, pierna izquierda. Caminar es fácil, la mayoria de las veces.')
    }
}

export const pay = () => {
    if (Math.random() < ERROR_CHANCE) {
        throw new Error('Parece ser que no llevabas suficiente dinero suelto, ni tarjetas, ni cheques. ¿Aceptarán este pañuelo usado que esta envolviendo un chicle de hierbabuena muy masticado?')
    } else {
        console.log('Ah, intercambio de papeles con puentes dibujados por bienes materiales, que mundo más lógico y funcional.')
    }
}

export const eatPopcorn = () => {
    if (Math.random() < ERROR_CHANCE) {
        throw new Error('Espera... ese no es el agujero de tragar. Tosé, rápido, ¡y levantate y grita antes de morir por asfixia palomitera!')
    } else {
        console.log('Mmmh, comer todas las palomitas antes de que empiece la peli, qué tipico.')
    }
}

export const theresNoPlaceLikeHome = () => {
    if (Math.random() < ERROR_CHANCE) {
        throw new Error('¿Te has dejado las llaves antes de salir de casa? Pues nada, a pagar a un cerrajero de emergencia y llorar en silencio un rato')
    } else {
        console.log('De vuelta en casa. ¿Quién iba a pensar que ir al cine era tal aventura?')
    }
}

// Funciones asincronas
export const searchForFriend = (callback) => {
    console.log('Buscando alguien que quiera ir al cine...')
    const nobodyLovesYou = Math.random() < ERROR_CHANCE

    setTimeout(() => {
        if (nobodyLovesYou) {
            callback(new Error('No hay... ¿nadie? Hello darkness my old friend...'))
        } else {
            callback(null, 'Parece ser que sí hay gente dispuesta a ver la peli.')
            /*(error, message) => {
        if (error) console.log(error)
        else {
            console.log(message)
            dressUp()
        }*/
        }
    }, 2999);

}

export const waitForFriend = (callback) => {
    console.log('Esperando a tu acompañante en la puerta del cine...')
    const friendBetrayedYou = Math.random() < ERROR_CHANCE

    setTimeout(() => {
        if (friendBetrayedYou) {
            callback(new Error('Existe llegar tarde, pero más le vale que le haya atropellado un camión porque ya han terminado las sesiones y sigues de pie, esperando, bajo la lluvia (sí, ahora esta lloviendo)'))
        } else {
            callback(null, 'Ah, qué bonito es que no te abandonen y todo salga bien')
        }
    }, 3500);
}

export const buyTicket = (callback) => {
    console.log('Esperando a que te saquen la entrada...')
    const butWhy = Math.random() < ERROR_CHANCE

    setTimeout(() => {
        if (butWhy) {
            callback(new Error('Se ha ido la luz en toda la ciudad, vaya un fiasco.'))
        } else {
            callback(null, 'Podrías haberla comprado antes de salir de casa por internet, pero al menos ya esta hecho.')
        }
    }, 1000);
}

export const buyPopcorn = (callback) => {
    console.log('Esperando a que te preparen las palomitas...')
    const thatWouldNeverHappen = Math.random() < ERROR_CHANCE

    setTimeout(() => {
        if (thatWouldNeverHappen) {
            callback(new Error('¡Ha explotado! ¡Todo! ¡Las palomitas están por todas partes, y siguen explotando! ¡Corred!'))
        } else {
            callback(null, 'Mmh, inofensivas y deliciosas palomitas.')
        }
    }, 1000);
}

export const waitForGreenLight = (callback) => {
    console.log('Esperando a que el semaforo se ponga en verde...');
    const hit = Math.random() < ERROR_CHANCE
    setTimeout(() => {
        if (hit) {
            callback(new Error('¿Vas a cruzar en rojo al final? Pues te atropella una scooter.'))
        } else {
            callback(null, 'Suerte que la gente siempre respeta los semaforos y los pasos de cebra, qué seguro es moverse por la ciudad.')
        }
    }, 2000);
}

export const watchMovie = (callback) => {
    console.log('Viendo la peli...');
    const soBoring = Math.random() < ERROR_CHANCE
    setTimeout(() => {
        if (soBoring) {
            callback(new Error('¿De verdad tenias ganas de ver esta peli? Qué tostón. ¿Y si te echas una minisiesta?'))
        } else {
            callback(null, 'Buena peli, ni siquiera estaba el único momento gracioso en el trailer. Se nota que confiaban en su producto.')
        }
    }, 7000);
}
