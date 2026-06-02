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
    name : {
        type: String,
        minLength : 3,
        required: true
    },
    number :{ type: String,
        validate:{
            validator : (v)=> /\d{3}-\d{7}/.test(v) ,
            validator: (v)=> /\d{2}-\d{7}/.test(v)
        },
        message: props => `${props.value} is not a valid phone number`,
        required: [, "user phone number required"]},
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