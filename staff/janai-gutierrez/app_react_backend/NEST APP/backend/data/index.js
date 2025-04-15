import fs from 'fs'
import users from "./users.js"
export const data = {
    users,
}

/*
const object = {test: 'hola'}
const json = JSON.stringify(object)

// ens permet escriure en el JSON

fs.writeFile('./test.json', json, (error) => {
    if(error) console.error
    else console.log('data saved')

})

// ens permet llegir dades

fs.readFile('./test.json', (error, data) => {
    if (error) console.error(error)
    else console.log(JSON.parse(data).users)
})

*/