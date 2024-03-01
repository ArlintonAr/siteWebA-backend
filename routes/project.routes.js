import { Router } from "express";

import { createProject, listProject } from "../controllers/project.controller.js";


import { check } from "express-validator";
import validateCamps from "../middlewares/validate-camps.js";
import validateJWT from "../middlewares/validate-JWT.js";


const projectRouter=Router()



projectRouter.get('/',listProject)

projectRouter.post('/',[
    validateJWT,
    check('name','El nombre es requerido').notEmpty(),
    check('technologies','Por lo menos agregue una tecnología').notEmpty(),
    check('url','La ruta del proyecto es obligatorio'),
    validateCamps
],createProject)




export default projectRouter