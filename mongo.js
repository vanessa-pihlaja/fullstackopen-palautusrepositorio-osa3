/*const mongoose = require('mongoose')



const personSchema = new mongoose.Schema({ 
  name: String,
  number: String,
}, {collection: "persons"});

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // if only the password is provided, list all entries in the phonebook.
  Person.find({}).then((persons) => {
    console.log('Phonebook:')
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // if three command-line arguments are given, add a new entry to the phonebook.
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to the phonebook`)
    mongoose.connection.close()
  })
}



*/