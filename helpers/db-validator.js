import Role from "../models/role.js"
import User from "../models/user.js"




const existUserForId = async (id) => {

    const user = await User.findById(id)
    if (!user) {
        throw new Error(`El usuario con el id ${id} no existe en la base de datos.`)
    }

}

const emailExist = async (email) => {

    const emailExist = await User.findOne({ email: email })
    if (emailExist) {
        throw new Error(`El ${email} ingresado ya existe.`)
    }
}

const existRole = async (name) => {

    const roleExist = await Role.findOne({ name: name })
    if (!roleExist) {
        throw new Error(`El rol ${name} no existe en la base de datos.`)
    }
}


export { existUserForId, emailExist, existRole }