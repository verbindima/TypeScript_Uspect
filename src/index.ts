import "reflect-metadata";
import {createConnection} from "typeorm";
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import usersRouter from './routes/usersRouter'
import catalogRouter from './routes/catalogRouter'
import pizzeriasRouter from './routes/pizzeriaRouter'
import ordersRouter from './routes/ordersRouter'
import * as config from './config/config'
import path from 'path'

const PORT = config.default.PORT
const app = express()
app.use(json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api/users', usersRouter)
app.use('/api/catalog', catalogRouter)
app.use('/api/pizzerias', pizzeriasRouter)
app.use('/api/orders', ordersRouter)

createConnection()
    .then(async () => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    
}).catch(error => console.log(error));
