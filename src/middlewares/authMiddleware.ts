import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import config from '../config/config'
import { extractCookieFromRequest } from '../utilities/apiUtilities'
import ApiError from '../utilities/api-error'

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
          if (!isAdmin) {
            return next(ApiError.accessDenied())
          }
        }
        next()
      } else if (authorizationHeader && authorizationHeader.refreshToken) {
        const refreshToken = authorizationHeader.refreshToken
        const decodedData = jwt.verify(refreshToken, config.jwtRefreshKey)
        const isAdmin = (Object.values(decodedData))[1]
        if (onlyAdmin) {
          if (!isAdmin) {
            return next(ApiError.accessDenied())    
            }
        }
        next()
      }
      
    } catch (e) {
        return next(ApiError.UnauthorizedError())    
      }
  }
}
