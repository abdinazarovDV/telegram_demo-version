export const contactController = {
    GET: function(req, res, next) {
        try{
            let data = req.jsonReaderFile("users")
            let arrContacts = null
            for(let user of data){
                if(user.userId == req.userId){
                    arrContacts = user.contacts
                }
            }
            let arrObjContacts = []
            for(let id of arrContacts){
                for(let user of data){
                    if(user.userId == id){
                        delete user['contacts']
                        delete user['password']
                        arrObjContacts.push(user)
                    }
                }
            }
            // console.log(arrObjContacts);
            res.send(arrObjContacts)
        } catch(err){
            return next(err);
        }
    },
    POST: function(req, res, next){
        try {
            const username = req.body.username
            console.log(username);
            let data = req.jsonReaderFile('users')
            let check = data.find( user => user["username"] == username)
            if(check){
                let noCon = true
                for(let user of data) {
                    if(user.userId == req.userId){
                        for(let id of user.contacts){
                            if(id == check.userId){
                                noCon = false
                            }
                        }
                    }
                }

                if(!noCon) throw new Error("User has already added to your contacts list")

                if(check.userId == req.userId) throw new Error('User cannot add yourself to contact')

                data.forEach(user => {
                    if(user.userId == req.userId){
                        user.contacts.push(check.userId)
                    }
                })
                req.jsonWriterFile('users', data)
                res.status(200).json({
                    status: 200,
                    message: "contact added"
                })
            } else {
                throw new Error('There is no user with this ' + username)
            }
        } catch(err){
            return next(err)
        }
    },
    DELETE: function (req, res, next) {
        try {

            let deleteId = req.body.userId

            let data = req.jsonReaderFile("users")
            let adminUser = data.find( user => user.userId == req.userId)
            if(adminUser.contacts.length > 0){
                let index = adminUser.contacts.findIndex(id => id == deleteId)
                data.forEach( user => {
                    if(user.userId == adminUser.userId) {
                        user["contacts"].splice(index, 1)
                    }
                })
                req.jsonWriterFile("users", data)
                res.status(200).json({
                    status: 200,
                    message: "contact deleted"
                })
            }

        } catch(err){
            next(err)
        }
    },
    MessageGET: function(req, res, next) {
        try {
            let data = req.jsonReaderFile("messages")
            data = data.filter( message => {
                if(message.userId == req.userId || message.toUserId == req.userId){
                    return message
                }
            })
            console.log(data);
        } catch(err){

        }
    }
}