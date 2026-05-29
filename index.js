import express from 'express'
//import cors from 'cors'
import requestLogger from './Middlewares/requestLogger.js'
import unknownEndpoint from './Middlewares/endpoint.js'
import morgan from 'morgan'
const app = express()


app.use(express.json())
//app.use(requestLogger)
//app.use(unknownEndpoint)
//app.use(cors())
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
    res.json(persons)
})

app.get('/info', (req, res)=>{
    const date = new Date ()
    res.send(`<p>Phonebook has info for ${persons.length} people </br>
      ${date}</p>`)
})

app.get('/api/persons/:id', (req, res)=>{
    const id = req.params.id
    const person = persons.find(pers => pers.id === id)
    
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (req, res)=>{
    const id = req.params.id

    persons = persons.filter(pers => pers.id !== id)
    res.json(persons)
})

    const generatedId = ()=>{
        const random = ()=> Math.floor(Math.random()*36)
        const caractere = "abcdefghijklmnopqrstuvwxyz123456789" 
        const code =[]
        for(let i = code.length ; i < 5 ; i++  ){
            const chain = caractere[random()]
            code.push(chain)
        }
        return code.join('')
    }
    
  
app.post('/api/persons', (req, res)=>{
    const body = req.body
    const person ={
        name : body.name,
        number : body.number,
        id: generatedId()
    }
    const existName = (persons.filter(pers => pers.name.toLowerCase() === body.name.toLowerCase()))
    if(!person.name || !person.number){
        return res.status(400).json({
            error : "name or number is missing"
        })
    }
    if(existName.length > 0){
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    persons =  persons.concat(person)
    res.json(persons)
    //console.log(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)