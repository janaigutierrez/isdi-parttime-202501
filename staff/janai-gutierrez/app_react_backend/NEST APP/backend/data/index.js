import users from "./users.js"
import posts from './posts.js'

export const data = {
    users, posts
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