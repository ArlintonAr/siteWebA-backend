import { request, response } from "express"

const isAdmin = (req = request, res = response, next) => {

    try {
        const { role, name } = req.user
        if (role != 'ADMIN_ROLE') {
            return res.status(400).json({
                msg: `${name} No estas autorizado para realizar esta acción.`
            })
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: `Ha ocurrido un problema, comuníquese con el administrador.`
        })

    }
    next()
}

//continuar aqui hay mas validaciones



export default isAdmin