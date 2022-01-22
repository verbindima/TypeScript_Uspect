import * as express from 'express'
import controllers from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'
import validator from '../validators/userValidator'
const { register, login, updateUser, getUser, getOrders } = controllers

const router = express.Router()

router.post(
  '/register', validator.register,
    register
)
router.post('/auth', validator.auth, login) 
router.patch('/', authMiddleware(), validator.update, updateUser) 
router.get('/', authMiddleware(), getUser) 
router.get('/orders', authMiddleware(), validator.getOrders, getOrders)

export default router
