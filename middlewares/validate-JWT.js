import { request, response } from "express";
import Jwt from "jsonwebtoken";
import User from "../models/user.js";

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: "Es necesario el TOKEN para esta petición"
        })
    }

    try {
        const  {id} = Jwt.verify(token, process.env.PRIVATEkEYJWT)

        const user = await User.findById(id)

        if (!user) {
           
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos!"
            })
        }
        if (!user.state) {
            return res.status(400).json({
                msg: "El usuario no está activo!"
            })
        }
        req.user = user

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: "El token no es válido"
        })

    }
    next()
}


export default validateJWT