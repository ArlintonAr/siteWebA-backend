import { Schema,model } from "mongoose";


const roleSchema =new Schema({

    name:{
        type:String,
        required:[true,'El nombre del Rol es requerido'],
        default:'USER_ROLE',
        enum:['ADMIN_ROLE','USER_ROLE','EDIT_ROLE']
    }

})


const Role=model('Role',roleSchema)


export default Role


