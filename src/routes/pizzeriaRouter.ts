import * as express from 'express'
import controllers from '../controllers/pizzeriaController.js'
import authMiddleware from '../middlewares/authMiddleware'
const { create, get, getOne, updateOne, deleteOne } = controllers

const router = express.Router()

router.get('/', get) 
router.post('/', authMiddleware(true), create) 
router.get('/:id', getOne)
router.patch('/:id', authMiddleware(true), updateOne) 
router.delete('/:id', authMiddleware(true), deleteOne) 


export default router
