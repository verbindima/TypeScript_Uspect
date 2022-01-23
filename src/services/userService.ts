import bcrypt from 'bcrypt'
import { User } from '../entity/user.entity'
import tokenService from './tokenService'
import { Order } from  '../entity/order.entity'
class UserService {
  async register(
    email: string, 
    password: string, 
    isAdmin: boolean, 
    name:string, 
    surname:string, 
    city:string,
    address:string,
    phone:string,
    birthday:string) {
    const candidate = await User.findOne({ email })
    if (candidate) {
      throw new Error('Пользователь с такой почтой уже существует')
    }
    const trueDate = birthday.split('.');
    const us_date = trueDate.reverse().join('-');
    const hashPassword = bcrypt.hashSync(password, 7) //Hash password
    const user = User.create({
      email,
      password: hashPassword, 
      isAdmin, 
      name, 
        surname, 
        city, 
        address, 
        phone, 
        birthday: us_date
    })
    await user.save()
    const tokens = tokenService.generateTokens(user.id, user.isAdmin)
    await tokenService.saveToken(user.id, tokens.refreshToken)

    return { ...tokens, user }
  }
  async login(
    email: string, 
    password: string, 
  ) {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error(`Почта ${email} не зарегистрирована`)
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      throw new Error('Введен неправильный пароль')
    }
    const tokens = tokenService.generateTokens(user.id, user.isAdmin)
    await tokenService.saveToken(user.id, tokens.refreshToken)

    return {...tokens, user }
  }
  async updateUser(refreshToken:string, userChanges: User) {
    const token = await tokenService.findToken(refreshToken)
    if (!token || !token.userId) {
      throw new Error('Неправильный токен')
    }
    const userUpdated = await User.update(token.userId, userChanges)
    return userUpdated
  }
  async getUser(refreshToken: string) {
    const token = await tokenService.findToken(refreshToken)
    if (!token || !token.userId) {
      throw new Error('Неправильный токен')
    }
    const id = token.userId
    const user = await User.findByIds([id])
    return user
  }
  
  async getOrders(userId:number,
    limit: number,
    offset: number ) {
      const orders = await Order.findAndCount({
        where: {user: userId},
        skip: offset, 
        take: limit})
        
    return orders
    }

  
}
  export default new UserService()