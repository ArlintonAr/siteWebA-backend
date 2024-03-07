import { Schema, model } from 'mongoose'

const certificationSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El Nombre es requerido']
    },
    icon: {
        type: String
    },
    entity: {
        type: String,
        required: [true, 'La entidad certificadora es obligatorio']
    },
    url: {
        type: String
    },
    credential:{
        type:String
    },
    date: {
        type:Date
    }
})




const Certification = model('Certification', certificationSchema)

export default Certification