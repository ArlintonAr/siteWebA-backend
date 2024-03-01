import { request, response } from 'express'
import Project from '../models/project.js'


const listProject = async (req = request, res = response) => {

    const {limit=5,from=0}=req.query

    const [total, projects] = await Promise.all([
        Project.countDocuments(),
        Project.find()
            .skip(from)
            .limit(limit)
    ])
    res.json({
        msg: "Lista de proyectos",
        total,
        projects
    })
}

const createProject = async (req = request, res = response) => {

    try {
        const { name, technologies, img,url } = req.body

        const newProject = new Project({ name, technologies, img,url })

        await newProject.save()

        res.status(200).json({
            msg: "Hola desde creacion de proyecto",
            newProject
        })

    } catch (error) {
        console.log(error)
    }
}



export { listProject, createProject }