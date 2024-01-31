import { request, response } from "express"
import bcrypt from 'bcryptjs'
import User from "../models/user.js"


const listUser = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query
    const stateInTrue = { state: true }

    try {
        const [total, users] = await Promise.all([
            User.countDocuments(stateInTrue), //TODO: Aquí podría validar todos los usuarios activos
            User.find(stateInTrue)
                .skip(Number(from))
                .limit(Number(limit))

        ])
        res.status(200).json({
            msg: "OK",
            total,
            users
        })
    } catch (error) {
        throw new Error('Ha ocurrido un error. Comuníquese con el administrador', error)
    }
}
const listUserForId = async (req = request, res = response) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        return res.status(200).json({
            msg: "Ok",
            user
        })
    } catch (error) {
        throw new Error('Ha ocurrido un error. Comuníquese con el administrador', error)
    }

}

const createUser = async (req = request, res = response) => {
    try {

        const { name, lastName, email, password, role } = req.body

        const newUser = new User({ name, lastName, email, password, role })

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(10)
        newUser.password = bcrypt.hashSync(password, salt)

        await newUser.save()

        res.status(201).json({
            msg: "Usuario creado exitosamente!",
            newUser
        })
    } catch (error) {
        console.log(error)
    }

}

const updateUser = async (req = request, res = response) => {
    try {
        const { id } = req.params
    
        const { _id, email, google,password, ...others } = req.body
    
        if(password){
               //Encriptar contraseña
               const salt = bcrypt.genSaltSync(10)
               others.password = bcrypt.hashSync(password, salt)
        }
        //Trabajar en actualizacion de datos del usuario
        const userUpdated = await User.findByIdAndUpdate(id, others)
    
    
        res.status(201).json({
            msg: "Usuario actualizado exitosamente!",
            userUpdated,
            others
        })        
    } catch (error) {
        console.log(error)
    }

}

const deleteUser=async(req = request, res = response)=>{
    try {
        const {id}=req.params

        //Para eliminar no tomaré en cuenta eliminar fisicamente sino cambiaremos el estado a "false"
        const userDeleted=await User.findByIdAndUpdate(id,{state:false})

        res.status(200).json({
            msg:"El usuario ha sido eliminado exitosamente!",
            userDeleted
        })
    } catch (error) {
        
    }
}

export { listUser, createUser, listUserForId, updateUser,deleteUser }