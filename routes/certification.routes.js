import { Router } from "express";
import { check } from "express-validator";

import validateCamps from "../middlewares/validate-camps.js";
import validateJWT from "../middlewares/validate-JWT.js";

import { createCertification, listCertification } from "../controllers/certification.controller.js";
import isAdmin from "../middlewares/validate-roles.js";
import { credentialExist } from "../helpers/db-validator.js";


const certificationRouter = Router()

certificationRouter.get('/', listCertification)

certificationRouter.post('/', [
    validateJWT,
    isAdmin,
    check('name', 'El nombre del certificado es requerido').notEmpty(),
    check('entity', 'La entidad certificadora es obligatorio').notEmpty(),
    check('date','La fecha no es correcta').toDate(),
    check('credential').custom(credentialExist),
    validateCamps
], createCertification)



export default certificationRouter
