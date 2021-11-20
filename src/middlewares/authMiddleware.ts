import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
dotenv.config({ path: '__dirname/.env' })

export default function (onlyAdmin = false) {
  return function (req: Request, res: Response, next: NextFunction
  ) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const accessToken = req.headers.authorization.split(' ')[1] || req.cookies
      if (!accessToken) {
        return res.status(403).json({ message: 'Пользователь не авторизован' })
      }
      const decodedData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
      const isAdmin = decodedData
      if (onlyAdmin) {
        if (!isAdmin) {
          return res.status(403).json({ message: 'В доступе отказано' })
        }
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Пользователь не авторизован' })
    }
  }
}
