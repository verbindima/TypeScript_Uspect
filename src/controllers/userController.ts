import userService from '../services/userService'
import  { Request, Response } from 'express'


class userController {
    async register(req: Request, res: Response) {
      try {
        
        const { email, password, isAdmin, name, surname, city, address, phone, birthday } = req.body
        const userData = await userService.register(
            email, 
            password, 
            isAdmin, 
            name, 
            surname, 
            city, 
            address, 
            phone, 
            birthday
        )
        await userData.user.save()
        res.cookie('accessToken', userData.accessToken, {
          maxAge:  60 * 60 * 1000,
          httpOnly: true,
        })
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 14 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        return res
          .status(200)
          .json({ userData, message: 'Пользователь успешно зарегистрирован' })
      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'registration Error' })
      }
    }
   
    async login(req: Request, res: Response) {
      try {
        const { email, password } =  req.body
        const userData = await userService.login(email, password)
        res.cookie('accessToken', userData.accessToken, {
          maxAge:  60 * 60 * 1000,
          httpOnly: true,
        })
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        return res.status(200).json( {userData})
      }
     catch (e) {
      console.log(e)
      res.status(401).json({ message: 'login Error' })  
     }
    }
    async updateUser(req: Request, res: Response) {
      try{


        const { refreshToken } = req.cookies
        
        const updated = await userService.updateUser(refreshToken, req.body)
  
        res.status(200).json( {updated, message: 'Данные обновлены'})
      }
      catch (e) {
        console.log(e)
        res.status(400).json({ message: 'updateUser Error' })
      }
      
    }
    async getUser(req: Request, res: Response) {
      try {
        const { refreshToken } = req.cookies
        const user = await userService.getUser(refreshToken)
        res.status(200).json({ user })
      } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'getUser Error' })
      }
    }
    async getOrders(req: Request, res: Response) {
      const limit = typeof(req.query.limit) !== 'undefined' ? Number(req.query.limit) : 10;
      const page = typeof(req.query.page) !== 'undefined' ? Number(req.query.page) : 1; 
      const userId = Number(req.query.userId)
      const offset = page * limit - limit

      const orders = await userService.getOrders(userId, limit, offset)
      return res.status(200).json( {orders})
    }
}

export default new userController()
