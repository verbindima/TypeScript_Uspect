import * as express from 'express'
import controllers from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'
const { register, login, updateUser, getUser, getOrders } = controllers

const router = express.Router()

router.post(
  '/register',
    register
)
router.post('/auth', login) 
router.patch('/', authMiddleware(), updateUser) 
router.get('/', authMiddleware(), getUser) 
router.get('/orders', authMiddleware(), getOrders)

export default router
