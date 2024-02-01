
import {Schema,model} from "mongoose";



const userSchema =new Schema({

    name:{
        type:String,
        required:[true,'El nombre es requerido']
    },
    lastName:{
        type:String,
        required:[true,'El apellido es requerido']
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es requerida']
    },
    role:{
        type:String,
        ref:'Role',
        required:true,
    },
    img:{
        type:String,
        default:''
    },
    state:{
        type:Boolean,
        default:true

    },
    google:{
        type:Boolean,
        default:false
    }


}) 

userSchema.methods.toJSON=function () {
    const {__v,password,_id,...user}=this.toObject()
    user.uid=_id
    return user
}


const User = model('User', userSchema);

export default User