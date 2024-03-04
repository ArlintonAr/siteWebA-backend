
import mongoose from "mongoose";

const connectionDb = async () => {

    try {
        await mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@cluster0.0kexukl.mongodb.net`)
            .then(() => console.log('Base de datos conectada!'))
    } catch (error) {
        throw Error("Ha ocurrido un error en la conexión:", error)
    }

}

export default connectionDb

