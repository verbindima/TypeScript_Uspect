import { ItemList } from "../entity/itemList.entity"
import { Order } from "../entity/order.entity"
import { Catalog } from "../entity/catalog.entity"
import { Pizzeria } from "../entity/pizzeria.entity"
import { User } from "../entity/user.entity"
import mailService from "./mailService"
class OrderService {
    async createOrder(
      userId: number,
      pizzeriaId: number,
      itemList: Array<ItemList>) {
        if (itemList) {
          let pizzaCount = 0
          let discount = 0
          const total =  await itemList.reduce(async (prev, next) => {
            const acc = await prev
            const { catalog, count } = next
            const item =  await Catalog.findOne({
                where: {id: catalog}
           })           
           if (item ){
              acc.push({item: item.title, type: item.type, price: item.price * count, count, img: item.picture})
           }
           
            return acc
          }, Promise.resolve([{item: "", type: "", price: 0, count: 0, img: ''}]))
          total.shift()
          const priceOrderWithoutDiscount = total.reduce((prev,next) => prev + next.price, 0)
          const isCola = total.reduce((prev,next) =>  next.item === 'Coka-Cola'? true : false, false)
          pizzaCount = total.reduce((prev, next) => {
            if (next.type === 'Пицца') {
              pizzaCount = pizzaCount + next.count 
            }
            return pizzaCount
          }, 0)
          if (pizzaCount >= 2 && isCola === true) {
            discount = discount + 100
          } 
          
          const user = await User.findOne(userId)
          const isBirthdayToday = (birthday:Date) => {
            const dateToday = new Intl.DateTimeFormat('ru', {
              month: "numeric",
              day: "numeric"
            }).format(new Date())
            const dateBirthd = new Intl.DateTimeFormat('ru', {
              month: "numeric",
              day: "numeric"
            }).format(new Date((birthday)))
            return dateBirthd === dateToday ? true : false
          }
          if (user && isBirthdayToday(user.birthday)) {
            discount = discount + (priceOrderWithoutDiscount * 15 / 100)
          }
          
          const order = Order.create({ pizzeria: {id:pizzeriaId}, user: {id: userId}, summ: priceOrderWithoutDiscount - discount, discount: discount })
          await order.save()
          const pizzeria = await Pizzeria.findOne({
            select: ['title'],
            where: {id: order.pizzeria.id}
          })
          const client = await User.findOne({
            select: ['email', 'name', 'surname'],
            where: {id: order.user.id}
          })

          if (client && pizzeria) {
          const clientName = `${client.name} ${client.surname}`
          const fullOrder = {
            id: order.id,
            client: clientName,
            pizzeria: pizzeria.title,
            summ: order.summ,
            discount: order.discount,
            createdAt: order.createdAt,
            itemList: total
          }
          await mailService.sendOrderMail(client.email, fullOrder, itemList, client)
          return fullOrder
          }
          

        }

    }

    async getOrders(pizzeriaId:number,
      limit: number,
      offset: number ) {
        if (pizzeriaId === 0) {
          const orders = await Order.findAndCount({
              skip: offset, 
              take: limit})
          return orders
      }
      const orders = await Order.findAndCount({
              where: {pizzeria: pizzeriaId},
              skip: offset, 
              take: limit})
      return orders
    }
    async deleteOne(id:number) {
      const order = Order.delete(id)
      return order
    }
    async updateOne(id:number, changes: Order) {
      const order = Order.update(id, changes)
      return order
       }
    async getOne(id: number) {
        const order = await Order.findOne({where: {id}})
        return order
    } 
  
    
  }

  
    export default new OrderService()