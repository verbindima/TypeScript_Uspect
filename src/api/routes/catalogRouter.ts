import * as express from 'express'
import controllers from '../controllers/catalogController'
import authMiddleware from '../middlewares/authMiddleware'
import { upload } from '../utilities/apiUtilities'
import validator from '../validators/catalogValidator'
const { create, get, getOne, updateOne, deleteOne } = controllers

const router = express.Router()

router.get('/', authMiddleware(true), validator.get, get)
router.post(
  '/',
  upload.single('picture'),
  authMiddleware(true),
  validator.create,
  create
)
router.get('/:id', validator.getDelOne, getOne)
router.patch('/:id', authMiddleware(true), validator.update, updateOne)
router.delete('/:id', authMiddleware(true), validator.getDelOne, deleteOne)

export default router
