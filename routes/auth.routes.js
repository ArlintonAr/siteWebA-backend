import { Router } from "express";


import { check } from "express-validator";
import validateCamps from "../middlewares/validate-camps.js";

import { emailExist } from "../helpers/db-validator.js";

import { loginUser, registerUser } from "../controllers/auth.controller.js";


const authRouter=Router()



authRouter.post('/login',[
    check('email','El correo no debe estar vacío').notEmpty(),
    check('email','El correo no es válido').isEmail(),
    check('password','La contrasña es obligatorio').notEmpty(),
    validateCamps
],loginUser)

///Continuar con pruebas de validacion de JWT

authRouter.post('/register',[
    check('name','El nombre es requerido').notEmpty(),
    check('lastName','El apellido es requerido').notEmpty(),
    check('email','El correo es requerido').notEmpty(),
    check('email','El correo no es válido').isEmail(),
    check('email').custom(emailExist),
    check('password','La contraseña ingresada no es válida').isLength({min:6}),
    validateCamps
],registerUser)




export default authRouter
