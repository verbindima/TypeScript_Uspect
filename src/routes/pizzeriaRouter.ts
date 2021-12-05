import * as express from 'express'
//import controllers from '../controllers/orderController.js'
import authMiddleware from '../middlewares/authMiddleware'
//const { getPizzerias, createPizzeria, getPizzeriaById, updatePizzeriaById, deletePizzeriaById } = controllers

const router = express.Router()

router.get('/') 
router.post('/', authMiddleware(true)) 
router.get('/:id')
router.patch('/:id', authMiddleware(true)) 
router.delete('/:id', authMiddleware(true)) 


export default router
