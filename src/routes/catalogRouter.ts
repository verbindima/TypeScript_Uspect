import * as express from 'express'
//import controllers from '../controllers/catalogController.js'
import authMiddleware from '../middlewares/authMiddleware'
//const { getGoods, createProduct, getProductById, updateProductById, deleteProductById } = controllers

const router = express.Router()

router.get('/', authMiddleware(true))
 
router.post('/', authMiddleware(true)) 
router.get('/:id')
router.patch('/:id', authMiddleware(true)) 
router.delete('/:id', authMiddleware(true)) 


export default router
