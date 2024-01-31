
import mongoose from "mongoose";

const connectionDb = async () => {

    try {
        await mongoose.connect(process.env.CONNECTIONDB)
            .then(() => console.log('Base de datos conectada!'))
    } catch (error) {
        throw Error("Ha ocurrido un error en la conexión:", error)
    }

}

export default connectionDb

