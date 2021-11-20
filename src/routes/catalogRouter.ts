import * as express from 'express'
import controllers from '../controllers/catalogController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
const { getGoods, createProduct, getProductById, updateProductById, deleteProductById } = controllers

const router = express.Router()

router.get('/', authMiddleware(true), getGoods) 
router.post('/', authMiddleware(true), createProduct) 
router.get('/:id', getProductById)
router.patch('/:id', authMiddleware(true), updateProductById) 
router.delete('/:id', authMiddleware(true), deleteProductById) 


export default router
