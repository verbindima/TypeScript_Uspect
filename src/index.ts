import "reflect-metadata";
import {createConnection} from "typeorm";
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import usersRouter from './routes/usersRouter.js'
import catalogRouter from './routes/catalogRouter.js'
import pizzeriasRouter from './routes/pizzeriaRouter.js'
import ordersRouter from './routes/ordersRouter.js'
import * as dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const PORT = process.env.PORT || 5000
const app = express()

app.use(json())
app.use(cookieParser())
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter)
app.use('/pizzerias', pizzeriasRouter)
app.use('/orders', ordersRouter)

createConnection()
    .then(async () => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    
}).catch(error => console.log(error));
