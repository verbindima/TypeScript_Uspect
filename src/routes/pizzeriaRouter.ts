import * as express from 'express'
import controllers from '../controllers/orderController'
import authMiddleware from '../middlewares/authMiddleware.js'
const { getPizzerias, createPizzeria, getPizzeriaById, updatePizzeriaById, deletePizzeriaById } = controllers

const router = express.Router()

router.get('/', getPizzerias) 
router.post('/', authMiddleware(true), createPizzeria) 
router.get('/:id', getPizzeriaById)
router.patch('/:id', authMiddleware(true), updatePizzeriaById) 
router.delete('/:id', authMiddleware(true), deletePizzeriaById) 


export default router
