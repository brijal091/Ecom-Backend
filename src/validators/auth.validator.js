import joi from 'joi'

const signupSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    username: joi.string().alphanum().min(3).max(30).optional(),
    phone_no: joi.string().pattern(/^[0-9]{10}$/).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
})
export { signupSchema, loginSchema }