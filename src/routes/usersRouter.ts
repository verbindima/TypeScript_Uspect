import Router from 'express'
import controllers from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
const { register, login, logout, updateUser, getUser, getOrders } = controllers

const router = new Router()

router.post(
  '/register',
    register
)
router.post('/auth', login) 
router.post('/logout', logout) 
router.patch('/', authMiddleware(), updateUser) 
router.get('/', authMiddleware(), getUser) 
router.get('/orders', authMiddleware(), getOrders)

export default router
