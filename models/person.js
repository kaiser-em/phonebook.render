import 'dotenv/config'
import mongoose from "mongoose";


mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

    console.log('connecting to MongoDB')
    mongoose
        .connect(url, { family: 4 })
        .then(res =>{
            console.log('connected to MongoDB')
        })
        .catch(error=>{
            console.log('error connecting to Database:', error.message)
        })


const personSchema = new mongoose.Schema({
    name: String, 
    number : String,
})


const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON',{
    transform :(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id 
        delete returnedObject.__v
    }

})





export default Person