const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      minLength: 8,
      validate: {
        validator: function(v) {
          const beginningOfNum = v.split('-')[0]
          const endOfNum = v.split('-')[1]

          if (beginningOfNum.length !== 2 && beginningOfNum.length !== 3 && !isNaN(beginningOfNum)) {return false }

          if (isNaN(endOfNum)) { return false }
        },
        message: props => `${props.value} is not a valid phone number! It needs to have length of 8 or more and be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers`
      }
    },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)