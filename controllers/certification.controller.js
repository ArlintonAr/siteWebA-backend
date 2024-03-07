import { request, response } from "express";
import Certification from "../models/certifications.js";




const listCertification = async (req = request, res = response) => {

    try {
        const { limit = 5, from = 0 } = req.query
        const [total, certification] = await Promise.all([
            Certification.countDocuments(),
            Certification.find()
                .skip(from)
                .limit(limit)
        ])
        res.json({
            msg: "Lista de Certificados",
            total,
            certification
        })
    } catch (error) {
        console.log(error)
    }
}
const createCertification = async (req = request, res = response) => {

    try {
        const { name, icon, entity, date, url,credential } = req.body
        const newCertificate = new Certification({ name, icon, entity, date, url,credential })

        await newCertificate.save()

        res.status(200).json({
            msg: "Se ha creado correctamente!",
            newCertificate,

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Error interno del servidor',
        })
    }
}
export { listCertification, createCertification }