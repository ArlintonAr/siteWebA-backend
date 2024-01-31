import  Jwt  from "jsonwebtoken"

const generateToken = (id) => {
    return new Promise((resolve,reject)=>{
        const payload={id}
        Jwt.sign(
            payload,
            process.env.PRIVATEkEYJWT,
            { expiresIn: '4h' },
            (err,token)=>{
                if (err) {
                    console.log(err)
                    reject('No se pudo generar el token')
                }else{
                    resolve(token)
                }

            })
    })
}

export default generateToken