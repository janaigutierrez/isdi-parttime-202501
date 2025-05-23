import { MongoClient, ObjectId } from 'mongodb'

const url = 'mongodb://localhost:27017'
const dbName = 'nest-app'

export const data = {
    users: null,
    posts: null,
    ObjectId,
    connect: () => {
        const mongoClient = new MongoClient(url)

        return mongoClient.connect()
            .catch(error => console.error(error))
            .then(() => {
                console.info(`Connected to Mongo Server ${url}/${dbName}`)
                const db = mongoClient.db(dbName)
                data.users = db.collection('users')
                // data.users.find({}).toArray().then((users) => console.log(users))
                data.posts = db.collection('posts')
            })
    }
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