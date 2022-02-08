import Joi from 'joi'

const userValidation = Joi.object({
	username: Joi.string().max(20).alphanum().pattern(/^[a-zA-Z]+[0-9]*$/).required(),
	password: Joi.string().min(4).max(8).pattern(/^[0-9]*$/).required(),
})

export function validRegistor (req, res, next) {
	const { value, error } = userValidation.validate(req.body)
	
	return  ( error ? next(error) : next())
}

