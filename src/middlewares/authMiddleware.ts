import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import * as config from '../config/config'
import { extractCookieFromRequest } from '../utilities/apiUtilities'

export default function (onlyAdmin = false) {
  return function (req: Request, res: Response, next: NextFunction
  ){
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const authorizationHeader = extractCookieFromRequest(req);
        if (!authorizationHeader) {
          return res.status(401).json({ message: 'Пользователь не авторизован' })
        }
      const accessToken = authorizationHeader  //.split(' ')[1] //|| req.cookies
      if (!accessToken) {
         res.status(401).json({ message: 'Пользователь не авторизован' })
         return next(false)
      }

      
        const decodedData = jwt.verify(accessToken, config.default.jwtAccessKey)
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
