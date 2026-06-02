import mongoose from "mongoose";


if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}


const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.pnd4cvz.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family:4})

const personSchema = new mongoose.Schema({
    name : {
        type: String,
        minLength : 3,
        required: true
    },
    number :{ type: String, required: true},
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5 ){
    //console.log('Provide name and number!')
    const person = new Person ({
        name : process.argv[3],
        number: process.argv[4],
    })

    person.save().then(res =>{
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook! :)`)
        mongoose.connection.close
    })
}

if(process.argv.length === 3){
    Person
    .find({})
    .then(res =>{
        console.log('phonebook:')
        res.map(person =>{

            console.log(person.name + " " + person.number)
             mongoose.connection.close()
        })
    })
}

export default Person