import express from "express"
import { PORT } from '../config.js'
import fileupload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
const app = express();

app.use(express.json())
app.use(fileupload())
app.use(express.json())
app.use(cors())

import { validRegistor } from '#m/validation'
import { jsonEditor } from '#m/jsonworker'
import { tokenVerify } from '#m/token'

import contactRouter from "#r/contact"
import messageRouter from "#r/message"
import registerRouter from "#r/register"
import loginRouter from "#r/login"

app.use(jsonEditor)

app.use('/auth/login', loginRouter)
app.use('/auth/register', validRegistor, registerRouter)

app.use('/chatmedia', express.static(path.join(process.cwd(), 'src', 'media')))
app.use(tokenVerify)
    

app.use('/contacts', contactRouter)
app.use('/messages', messageRouter)

app.use((err, req, res, next) => {
    console.log(err);
    res.send({message:err.message});
})

app.listen(PORT, () => console.log("server http://localhost:" + PORT)) 