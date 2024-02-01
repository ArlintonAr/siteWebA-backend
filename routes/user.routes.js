
import { Router } from "express"
import { check } from "express-validator"
//Validacion para recoger los errores con express validator
import validateCamps from "../middlewares/validate-camps.js"
import validateJWT from "../middlewares/validate-JWT.js"


import { createUser, deleteUser, listUser, listUserForId, updateUser } from "../controllers/user.controller.js"
import { emailExist, existRole, existUserForId } from "../helpers/db-validator.js"
import isAdmin from "../middlewares/validate-roles.js"




const userRouter = Router()


userRouter.get('/',[], listUser)

userRouter.get('/:id',[
    check ('id','El id no es correcto').isMongoId(),//Comprueba si el id es un id de MongoDb
    check('id').custom(existUserForId),
    validateCamps
], listUserForId)

userRouter.post('/',[
    validateJWT,
    isAdmin,
    check('name','El nombre es requerido').notEmpty(),
    check('lastName','El apellido es requerido').notEmpty(),
    check('email','El correo no es válido').isEmail(),
    check('email').custom(emailExist),
    check('password','La contraseña ingresada no es válida').isLength({min:6}),
    check('role').custom(existRole),
    validateCamps
], createUser)


userRouter.put('/:id',[
    validateJWT,
    isAdmin,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existUserForId),
    check('role').custom(existRole),
    validateCamps
],updateUser)

userRouter.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existUserForId),
    validateCamps
],deleteUser)

export default userRouter