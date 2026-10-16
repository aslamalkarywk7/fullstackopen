require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument: node mongo.js <password> [name] [number]')
  process.exit(1)
}

const cluster = process.env.MONGODB_CLUSTER
if (!cluster) {
  console.log('set MONGODB_CLUSTER in .env (see .env.example)')
  process.exit(1)
}

const user = process.env.MONGODB_USER || 'fullstack'
const password = process.argv[2]
const url = `mongodb+srv://${user}:${password}@${cluster}/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('phonebook:')
    persons.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
