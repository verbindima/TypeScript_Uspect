import orderService from '../services/orderService'
import  { Request, Response } from 'express'

class orderController {
    async createOrder(req: Request, res: Response) {
        try {
          const {userId, pizzeriaId, itemList } = req.body
          const order = await orderService.createOrder(userId,pizzeriaId, itemList)
          res.status(200).json({order, message: 'Заказ создан' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'createOrder Error' })
        }
      }
      async getOrders(req: Request, res: Response) {
        try {
          const limit = typeof(req.query.limit) !== 'undefined' ? Number(req.query.limit) : 10;
          const page = typeof(req.query.page) !== 'undefined' ? Number(req.query.page) : 1; 
          const pizzeria = typeof(req.query.pizzeria) !== 'undefined' ? Number(req.query.pizzeria) : 0;
          const offset = page * limit - limit
          const orders = await orderService.getOrders(pizzeria, limit, offset)
    
          res.status(200).json({ orders })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'getOrders Error' })
        }
      }
      async getOrderById(req: Request, res: Response) {
        try {
          const  id  = parseInt(req.params.id)
          const order = await orderService.getOne(id)
          res.status(200).json({ order })
        } catch (e) {
          res.status(400).json({ message: 'getOneOrder Error' })
        }
      }
      async updateOrderById(req: Request, res: Response) {
        try {
          const order = await orderService.updateOne(parseInt(req.params.id), req.body)
          res.status(200).json(order)
        } catch (e) {
          res.status(400).json({ message: 'updateOrders Error' })
        }
      }
      
      async deleteOrderById(req: Request, res: Response) {
        try {
          const order = await orderService.deleteOne(parseInt(req.params.id))
          res.status(200).json(order)
        } catch (e) {
          res.status(400).json({ message: 'deleteOrders Error' })
        }
      }
}

export default new orderController()