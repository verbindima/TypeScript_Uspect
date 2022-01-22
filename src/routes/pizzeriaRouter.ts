import * as express from 'express'
import controllers from '../controllers/pizzeriaController.js'
import authMiddleware from '../middlewares/authMiddleware'
import validator from '../validators/pizzeriaValidator'

const { create, get, getOne, updateOne, deleteOne } = controllers

const router = express.Router()

router.get('/', validator.get, get) 
router.post('/', authMiddleware(true), validator.create, create) 
router.get('/:id', validator.getDelOne, getOne)
router.patch('/:id', authMiddleware(true), validator.update, updateOne) 
router.delete('/:id', authMiddleware(true), validator.getDelOne, deleteOne) 


export default router
