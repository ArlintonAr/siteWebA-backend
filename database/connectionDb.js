
import mongoose from "mongoose";

const connectionDb = async () => {

    const dbLocal='mongodb://localhost:27017/siteWebDB'
    try {
        await mongoose.connect(`${dbLocal}`|| `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@cluster0.0kexukl.mongodb.net/siteWebDB`)
            .then(() => console.log('Base de datos conectada!'))
    } catch (error) {
        throw Error("Ha ocurrido un error en la conexión:", error)
    }

}

export default connectionDb

