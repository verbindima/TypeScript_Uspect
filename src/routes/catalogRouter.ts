import * as express from 'express'
import controllers from '../controllers/catalogController.js'
import authMiddleware from '../middlewares/authMiddleware'
import { upload } from '../utilities/apiUtilities.js'

const { create, get, getOne, updateOne, deleteOne } = controllers

const router = express.Router()

router.get('/', authMiddleware(true), get) 
router.post('/', upload.single("picture"), authMiddleware(true), create) 
router.get('/:id', getOne)
router.patch('/:id', authMiddleware(true), updateOne) 
router.delete('/:id', authMiddleware(true), deleteOne) 


export default router
