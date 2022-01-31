import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import BodyParser from 'body-parser'
import usersRouter from './api/routes/usersRouter'
import catalogRouter from './api/routes/catalogRouter'
import pizzeriasRouter from './api/routes/pizzeriaRouter'
import ordersRouter from './api/routes/ordersRouter'
import config from './config/config'
import path from 'path'
import { errors } from 'celebrate'
import errorMiddleware from './api/middlewares/errorMiddleware'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from './swagger.json'

const PORT = config.PORT
const app = express()
app.use(json())
app.use(cookieParser())
app.use(BodyParser.json())

app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api/users', usersRouter)
app.use('/api/catalog', catalogRouter)
app.use('/api/pizzerias', pizzeriasRouter)
app.use('/api/orders', ordersRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(errors())
app.use(errorMiddleware)

createConnection()
    .then(async () => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    })
    .catch((error) => console.log(error))

export default app
