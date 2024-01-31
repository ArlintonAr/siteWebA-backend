import { Router } from "express";


import { check } from "express-validator";
import validateCamps from "../middlewares/validate-camps.js";

import { loginUser, registerUser } from "../controllers/auth.controller.js";


const authRouter=Router()



authRouter.post('/login',[
    check('email','El correo no debe estar vacío').notEmpty(),
    check('email','El correo no es válido').isEmail(),
    check('password','La contrasña es obligatorio').notEmpty(),
    validateCamps
],loginUser)


authRouter.post('/register',registerUser)




export default authRouter
