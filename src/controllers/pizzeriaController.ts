import  { Request, Response } from 'express'
import pizzeriaService from "../services/pizzeriaService"
class PizzeriaController {
    async get(req: Request, res: Response) {
        try {   
        const limit = typeof(req.query.limit) !== 'undefined' ? Number(req.query.limit) : 25;
        const page = typeof(req.query.page) !== 'undefined' ? Number(req.query.page) : 0; 
        const city = typeof(req.query.city) !== 'undefined' ? String(req.query.city) : 'none';
        const pizzerias = await pizzeriaService.getPizzerias(city, limit, page)
        res.status(200).json({pizzerias, message: 'Элементы отображены' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'getPizzerias Error' })
        }
      }
      async create(req: Request, res: Response) {
        try {
          const { title, city, address } = req.body
          const pizzeria = await pizzeriaService.createPizzeria(title, city, address)
          res.status(200).json({ message: 'Элемент создан', pizzeria })
          
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'createpizzeria Error' })
        }
      }
      async getOne(req: Request, res: Response) {
        try {   
        const  id  = parseInt(req.params.id)
        const pizzeria = await pizzeriaService.getOne(id)
        res.status(200).json({pizzeria, message: 'Элемент отображен' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'getOnepizzeria Error' })
        }
      }
      async updateOne(req: Request, res: Response) {
        try {   
        const  id  = parseInt(req.params.id)
        const changes = req.body
        const pizzeria = await pizzeriaService.updateOne(id, changes)
        res.status(200).json({pizzeria, message: 'Элемент обновлен' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'updateOnepizzeria Error' })
        }
      }
      async deleteOne(req: Request, res: Response) {
        try {   
        const  id  = parseInt(req.params.id)
        const pizzeria = await pizzeriaService.deleteOne(id)
        res.status(200).json({pizzeria, message: 'Элемент удален' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'deleteOnepizzeria Error' })
        }
      }
}

export default new PizzeriaController()