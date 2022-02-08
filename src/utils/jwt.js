import jwt from 'jsonwebtoken'
import { TOKEN_TIME, TOKEN_KEY } from '#u'

export function sign (payload) {
    return jwt.sign(payload, TOKEN_KEY)
}
export function verify (token) { 
    return jwt.verify(token, TOKEN_KEY)
}
