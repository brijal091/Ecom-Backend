import { signupService, loginService } from '../services/auth.service.js'
import { loginSchema, signupSchema } from '../validators/auth.validator.js'

export const signup = async (req, res) => {
    try {
        const {error} = signupSchema.validate(req.body)
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }
        const result = await signupService( req.body)
        res.status(201).json({ success:true, message: 'User created successfully', data: result })
    }  catch (err) {
    console.error("Signup error:", err)
    return res.status(err.statusCode || 500).json({ 
        success: false, 
        message: err.message || 'Internal server error' 
    })
}
}

export const login = async (req, res) => {
    try {
        const {error} = loginSchema.validate(req.body)
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }
        const result = await loginService(req.body)
        res.status(200).json({ success: true, message: 'Login successful', data: result })
    } catch (error) {
        console.error("Login error:", error)
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
}