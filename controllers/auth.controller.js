import { request, response } from "express"
import bcrypt from "bcryptjs"


import User from "../models/user.js"
import generateToken from "../helpers/generateJWT.js"


const loginUser = async (req = request, res = response) => {

    try {
        
        const { email, password } = req.body
    
        const user = await User.findOne({ email })
        //
        if (!user) {
            return res.status(401).json({
                msg: "Verifique sus credenciales!"
            })
        }
        //Validar si el usuario esta activo
        if(user.state===false){
            return res.status(401).json({
                msg: "El usuario no está activo!"
            })
        }
        //Comparamos la contraseña ingresada con la base de datos
        const existPassword = bcrypt.compareSync(password,user.password)
        if (!existPassword) {
            return res.status(401).json({
                msg: "Verifique sus credenciales!"
            })
        }
    
        //Generar Json Web Token
        const token= await generateToken(user.id)
    
    
       res.status(200).json({
            msg: "Ok, Accedió",
            usuario:user,
            token
        })

    } catch (error) {
         console.log(error)
        res.status(401).json({
            msg: "Ha ocurrido un problema, comuníquese con el administrador."
        })
    }

}

const registerUser =async (req = request, res = response) => {

    try {
        const {name,lastName,email,password}=req.body
    
        const newUser=new User({name,lastName,email,password})
    
        const salt = bcrypt.genSaltSync(10)
        newUser.password = bcrypt.hashSync(password, salt)
        newUser.role='USER_ROLE' 
    
        await newUser.save()
        res.status(200).json({
            msg: "Ok, Usuario Registrado"
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Ha ocurrido un problema, comuníquese con el administrador."
        })
    }
}


export { loginUser, registerUser }