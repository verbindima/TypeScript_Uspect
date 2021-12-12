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
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
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
      const user =  req.body.email
      return res.status(200).json( {user})
    }
    async getOrders(req: Request, res: Response) {
      const user =  req.body.email
      return res.status(200).json( {user})
    }
}

export default new userController()
