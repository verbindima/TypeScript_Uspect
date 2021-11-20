import * as express from 'express'
import controllers from '../controllers/orderController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
const { getOrders, createOrder, getOrderById, updateOrderById, deleteOrderById } = controllers

const router = express.Router()

router.get('/',  getOrders) 
router.post('/', authMiddleware(), createOrder) 
router.get('/:id', getOrderById)
router.patch('/:id', authMiddleware(true), updateOrderById) 
router.delete('/:id', authMiddleware(true), deleteOrderById) 


export default router