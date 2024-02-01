
import express  from "express";


import userRouter from "../routes/user.routes.js";
import authRouter from "../routes/auth.routes.js";


import connectionDb from "../database/connectionDb.js";


class Server{


    constructor(){
        
    this.app=express()
    this.PORT=process.env.PORT || 5000

    this.apiRoutes={
        user:'/api/user',
        auth:'/api/auth'
    }

    //Conexion a base de datos
    this.connectDB()

    //Middleware
    this.middlewares()
    //Rutas
        this.routes()

    }


    //Conexion a base de datos
   async connectDB(){
       await connectionDb()
    }

    //Middlewares
    middlewares(){

        //Lectura del body
        this.app.use(express.json())
    }

    //Manejo de rutas
    routes(){
        this.app.use(this.apiRoutes.user,userRouter),
        this.app.use(this.apiRoutes.auth,authRouter)  
    }

    //Iniciando el servidor 
    listen(){

        this.app.listen(this.PORT,()=>{
            console.log("Escuchando en el puerto: ", this.PORT)

        })
    }


}



export default Server