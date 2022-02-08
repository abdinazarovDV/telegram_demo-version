import sha256 from 'sha256'
import path from 'path'
import { sign } from '../utils/jwt.js'

export const registerController = {
    POST: function (req, res, next) {
        try {
            const { username, password } = req.body 
            const { files } = req.files || { files: "" }
            console.log(files);
            let data = req.jsonReaderFile("users")
            
            let find = data.find( user => user["username"] == username.toLowerCase() )
            if(find) throw new Error("This username has already existed")
            
            let img = null 
            if(files){

                if(!['jpg', 'png', 'jpeg'].includes(files.mimetype.split("/")[1])) {
                    throw new Error("Photo type mustbe png, jpg or jpeg")
                }

                let filename = (Date.now() % (10**9)) + files.name.replace(/\s/g, '')
                let adress = path.join(process.cwd(), 'src', 'media', 'avatar', filename)
                files.mv(adress)
                img = filename
            } 

            let newUser = {
                "userId": Date.now() % (10**6),
                username,
                "profileImg": (img ? ('/avatar/' + img ): '/avatar/default.png'),
                "password": sha256(password),
                signDate: Date.now(),
                contacts: []
            }
            
            data.push(newUser)
            req.jsonWriterFile("users", data)
            console.log(newUser);
            res.status(200).json({
                status: 200,
                message: "User successfully registered",
                token: sign( { userId:  newUser.userId, agent: req.headers['user-agent']})
            })
        } catch (err) {
            return next(err)
        }

        
    }
}