import 'dotenv/config'
import express from 'express'
import Person from './models/person.js'
import unknownEndpoint from './Middlewares/endpoint.js'
import morgan from 'morgan'


const app = express()


app.use(express.json())

app.use(express.static('dist'))
morgan.token('req-body',(req)=>{
    const body = JSON.stringify(req.body)
    return body
})

app.use(morgan(':method :url :status :res[content-length]:response-time ms :req-body'))
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (req, res)=>{
  
    Person
        .find({})
        .then(persons => {
            res.json(persons)
            persons.concat(persons)
        })
    
})

app.get('/info', (req, res)=>{
const date = new Date()
    Person 
        .countDocuments({})
        .then(count => {
            res.send(
                `<p>Phonebook has info for ${count} people </br>
                 ${date}</p>`

            )
        })
        
  
})

app.get('/api/persons/:id', (req, res)=>{
    Person 
        .findById(req.params.id)
        .then(person =>{
            if(person){
                res.json(person)
            }else{
                res.status(404).json({error : 'peson not found'})
            }
        })
    
})

app.delete('/api/persons/:id', (req, res)=>{
    Person
        .findByIdAndDelete(req.params.id)
        .then(result => {
            console.log('deleted from phonebook', result.name + " " + result.number)
            res.json(result)
        })

})

   /* const generatedId = ()=>{
        const random = ()=> Math.floor(Math.random()*36)
        const caractere = "abcdefghijklmnopqrstuvwxyz123456789" 
        const code =[]
        for(let i = code.length ; i < 5 ; i++  ){
            const chain = caractere[random()]
            code.push(chain)
        }
        return code.join('')
    }*/
    


app.post('/api/persons', (req, res)=>{
    const body = req.body

    const person = new Person({
        name : body.name,
        number : body.number,
    })


    person.save().then(result =>{
        console.log('added', result.name + " " + result.number)
        res.json(result)
    })
    

})

app.put('/api/persons/:id', (req, res)=>{
    const id = req.params.id
    const body = req.body

    const person = {
        name : body.name,
        number : body.number
    }

    Person
        .findByIdAndUpdate(id, person, {new: true, runValidators : true})
        .then(result =>{ 
            console.log('updated', result.name + " " + result.number)
            res.json(result)
        })
        .catch(error => {
            console.log('error updating:', error.message)
            res.status(400).json({error: 'update failed'})
        })
})


const PORT = process.env.PORT 
app.listen(PORT)
console.log(`Server running on port ${PORT}`)