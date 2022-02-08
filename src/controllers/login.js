import sha256 from 'sha256'
import path from 'path'
import { sign } from '../utils/jwt.js'

export const loginController = {
    POST: function (req, res, next) {
        try {
            const { username, password } = req.body || { username: '', password: '' }
            let data = req.jsonReaderFile("users")

            let named = data.find( user => {
                if(user["username"] == username) {
                    return user
                }
            })

            if(!named) throw new Error("The user not registered")

            if(named["password"] != sha256(password)) throw new Error("Inavailed password")

            res.status(200).json({
                status: 200,
                message: "Succesfully entered",
                token: sign({ userId: named.userId, agent: req.headers['user-agent'] })
            })
        } catch(err) {
            return next(err)
        }
    }
}