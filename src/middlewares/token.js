import { verify } from '../utils/jwt.js'

export function tokenVerify (req, res, next) {
    try {
		let { token } = req.headers
		if(!token) {
			throw new Error( "user is not authorized!")
		}
		let { userId, agent } = verify(token)
		if(!(req.headers['user-agent'] == agent)) {
			throw new Error( "token is invalid!")
		}
		
		req.userId = userId
		// console.log(req.userId)
		return next()
	} catch(error) {
		// console.log(error);
		return next(error)
	}
}