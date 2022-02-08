import path from 'path'

export const messageController = {
    GET: function(req, res, next) {
        
        try {
            const from = req.userId
            const toUserId = req.body.toUserId
    
            let data = req.jsonReaderFile("messages")
            data = data.filter( message => {
                if(
                    (message.userId == from && message["toUserId"] == toUserId) ||
                    (message.userId == toUserId && message["toUserId"] == from)
                ){
                    return message
                }
            })
            res.json(data)
        } catch (err) {
            return next(err);
        }
    },

    POST: function(req, res, next) {
        try {
            let { files } = req.files || { files: "" }
            let { toUserId = "", text = "" } = req.body  // toUserId, text
            if(!toUserId) throw new Error("No toUserId")
            let content = {}
            if(files){
                const filename = (Date.now() % (10**9)) + files.name.replace(/\s/g, '')
                const mimetype = files.mimetype.split('/')[1]    
                let adress = null

                if(['png', 'jpg', 'jpeg', 'svg'].includes(mimetype)){
                    adress = path.join(process.cwd(), 'src', 'media', 'img', filename)
                    content.main = '/img/' + filename
                } else if (mimetype === 'mp4'){
                    adress = path.join(process.cwd(), 'src', 'media', 'video', filename)
                    content.main = '/video/' + filename
                } 
                // else if (mimetype == 'webm;codecs=opus') {
                //     adress = path.join(process.cwd(), 'src', 'media', 'audio', filename)
                //     content.main = '/audio' + filename
                // }
                else {
                    adress = path.join(process.cwd(), 'src', 'media', 'files', filename)
                    content.main = '/files/' + filename
                }


                content["mimetype"] = mimetype
                content["size"] = files.size

                files.mv(adress)
            }

            if(text) {
                content["text"] = text
                content["mimetype"] = 'text'
            }

            let newMessage = {
                userId: from,
                messageId: (Date.now() % (10**9)),
                date: Date.now(),
                toUserId,
                content
            }

            let data = req.jsonReaderFile("messages")
            data.push(newMessage)
            req.jsonWriterFile("messages", data)
            res.status(200).json({
                status: 200,
                message: "message send"
            })
        } catch (err) {
            return next(err);
        }

    },

    DELETE: function(req, res, next) {
        /*
            token verify qilinib req.userId da id kegan bo'ladi
            req.body da toUserId keladi
        */
       try {
            const { messageId } = req.body
            let data = req.jsonReaderFile("messages")
            let index = data.findIndex( mes => mes["messageId"] == messageId)
    
            if(index) {
                data.splice(index, 1)
                req.jsonWriterFile("messages", data)
                res.status(200).json({
                    status: 200,
                    message: "message deleted"
                })
            }
       } catch (err){
           return next(err);
       }
    }
}  