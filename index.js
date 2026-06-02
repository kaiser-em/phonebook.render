import 'dotenv/config'
import express from 'express'
import Person from './models/person.js'
import unknownEndpoint from './Middlewares/endpoint.js'
import errorHandler from './Middlewares/errorHandler.js'
import morgan from 'morgan'


const app = express()


app.use(express.json())

app.use(express.static('dist'))
morgan.token('req-body',(req)=>{
    const body = JSON.stringify(req.body)
    return body
})

app.use(morgan(':method :url :status :res[content-length]:response-time ms :req-body'))


app.get('/api/persons', (req, res)=>{
  
    Person
        .find({})
        .then(persons => {
            res.json(persons)
            persons.concat(persons)
        })
        .catch(error => next(error))
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

app.get('/api/persons/:id', (req, res, next)=>{
    Person 
        .findById(req.params.id)
        .then(person =>{
            if(person){
                res.json(person)
            }else{
                res.status(404).json({error : 'peson not found'})
            }
        })
        .catch(error => next(error))
    
})

app.delete('/api/persons/:id', (req, res, next)=>{
    Person
        .findByIdAndDelete(req.params.id)
        .then(result => {
            console.log('deleted from phonebook', result.name + " " + result.number)
            res.status(204).end()
        })
        .catch(error => next(error))

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
    
app.post('/api/persons', (req, res, next)=>{
    const body = req.body

    const person = new Person({
        name : body.name,
        number : body.number,
    })

    person.save().then(result =>{
        console.log('added', result.name + " " + result.number)
        res.json(result)
    })
    .catch(error =>next(error))
    
})

app.put('/api/persons/:id', (req, res, next)=>{
    const body = req.body

    const {name, number} = req.body

   
    Person
        .findById(req.params.id)
        .then(person =>{
            if(!person){
                res.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then(updatedPerson =>{
                res.json(updatedPerson)
            } )
        })
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT)
console.log(`Server running on port ${PORT}`)