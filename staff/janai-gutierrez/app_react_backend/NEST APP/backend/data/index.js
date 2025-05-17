import users from "./users.js"
import posts from './posts.js'


console.log('[DATA] Importando módulos:')
console.log('[DATA] users:', typeof users, Object.keys(users))
console.log('[DATA] posts:', typeof posts, Object.keys(posts))

export const data = {
    users, posts
}

console.log('[DATA] Exportando data:', Object.keys(data))
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