import  { NextFunction, Request, Response } from 'express'
import pizzeriaService from "../services/pizzeriaService"
class PizzeriaController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {   
        const limit = typeof(req.query.limit) !== 'undefined' ? Number(req.query.limit) : 10;
        const page = typeof(req.query.page) !== 'undefined' ? Number(req.query.page) : 1; 
        const city = typeof(req.query.city) !== 'undefined' ? String(req.query.city) : 'none';
        const offset = page * limit - limit
        const pizzerias = await pizzeriaService.getPizzerias(city, limit, offset)
        res.status(200).json({pizzerias, message: 'Элементы отображены' })
        } catch (e) {
          next(e)
          console.log(e)
        }
      }
      async create(req: Request, res: Response, next: NextFunction) {
        try {
          const { title, city, address } = req.body
          const pizzeria = await pizzeriaService.createPizzeria(title, city, address)
          res.status(200).json({ message: 'Элемент создан', pizzeria })
          
        } catch (e) {
          next(e)
        }
      }
      async getOne(req: Request, res: Response, next: NextFunction) {
        try {   
        const  id  = parseInt(req.params.id)
        const pizzeria = await pizzeriaService.getOne(id)
        res.status(200).json({pizzeria, message: 'Элемент отображен' })
        } catch (e) {
          next(e)
        }
      }
      async updateOne(req: Request, res: Response, next: NextFunction) {
        try {   
        const  id  = parseInt(req.params.id)
        const changes = req.body
        const pizzeria = await pizzeriaService.updateOne(id, changes)
        res.status(200).json({pizzeria, message: 'Элемент обновлен' })
        } catch (e) {
          next(e)
        }
      }
      async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {   
        const  id  = parseInt(req.params.id)
        const pizzeria = await pizzeriaService.deleteOne(id)
        res.status(200).json({pizzeria, message: 'Элемент удален' })
        } catch (e) {
          next(e)
        }
      }
}

export default new PizzeriaController()