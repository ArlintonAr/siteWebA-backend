import { request, response } from "express"
import bcrypt from "bcryptjs"


import User from "../models/user.js"
import generateToken from "../helpers/generateJWT.js"


const loginUser = async (req = request, res = response) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })
    //
    if (!user) {
        return res.status(401).json({
            msg: "Usuario o contraseña invalidas!"
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
            msg: "Usuario o contraseña invalidas!"
        })
    }

    //Generar Json Web Token
    const token= await generateToken(user.id)


   res.status(200).json({
        msg: "Ok, Accedió",
        usuario:user,
        token
    })

}

const registerUser = (req = request, res = response) => {
    res.status(200).json({
        msg: "Ok, Usuario Registrado"
    })
}


export { loginUser, registerUser }