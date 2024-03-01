
import {Schema, model} from 'mongoose'


const projectSchema=new Schema({

    name:{
        type:String,
        required:[true,'El nombre del Rol es requerido']

    },
    technologies:{
        type:[String],
    },
    url:{
        type:String
    },
    img:{
        type:String,
    }
})

const Project=model('Project',projectSchema)


export default Project