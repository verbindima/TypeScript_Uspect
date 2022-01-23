import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import config from '../config/config'
import { extractCookieFromRequest } from '../utilities/apiUtilities'

export default function (onlyAdmin = false) {
  return function (req: Request, res: Response, next: NextFunction
  ){
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const authorizationHeader = extractCookieFromRequest(req);

      if (authorizationHeader && authorizationHeader.accessToken) {
        const accessToken = authorizationHeader.accessToken
        const decodedData = jwt.verify(accessToken, config.jwtAccessKey)
        
        const isAdmin =  (Object.values(decodedData))[1]
        
        if (onlyAdmin) {
          if (isAdmin[2]) {
            return res.status(403).json({ message: 'В доступе отказано' })
          }
        }
        next()
      } else if (authorizationHeader && authorizationHeader.refreshToken) {
        const refreshToken = authorizationHeader.refreshToken
        const decodedData = jwt.verify(refreshToken, config.jwtRefreshKey)
        const isAdmin = (Object.values(decodedData))[1]
        if (onlyAdmin) {
          if (isAdmin) {
            return res.status(403).json({ message: 'В доступе отказано' })
          }
        }
        next()
      }
      
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Пользователь не авторизован' })
    }
  }
}
