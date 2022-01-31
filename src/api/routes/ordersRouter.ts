import * as express from 'express'
import controllers from '../controllers/orderController'
import authMiddleware from '../middlewares/authMiddleware'
import validator from '../validators/orderValidator'
const {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} = controllers

const router = express.Router()

router.get('/', validator.get, getOrders)
router.post('/', authMiddleware(), validator.create, createOrder)
router.get('/:id', validator.getDelOne, getOrderById)
router.patch('/:id', authMiddleware(true), validator.update, updateOrderById)
router.delete(
  '/:id',
  authMiddleware(true),
  validator.getDelOne,
  deleteOrderById
)

export default router
