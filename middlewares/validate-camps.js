import { validationResult } from 'express-validator'


const validateCamps = (req, res, next) => {
    const errorsCamps = validationResult(req)

    if (!errorsCamps.isEmpty()) {
       return res.status(400).json({ errorsCamps })
    }
    next()
}

export default validateCamps