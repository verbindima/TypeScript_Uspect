import  { NextFunction, Request, Response } from 'express'
import catalogService from "../services/catalogService"
class catalogController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {   
        const limit = typeof(req.query.limit) !== 'undefined' ? Number(req.query.limit) : 10;
        const page = typeof(req.query.page) !== 'undefined' ? Number(req.query.page) : 1; 
        const type = typeof(req.query.type) !== 'undefined' ? String(req.query.type) : 'All';
        const offset = page * limit - limit
        const item = await catalogService.getItems(type, limit, offset)
        res.status(200).json({item, message: 'Элементы отображены' })
        } catch (e) {
          next(e)
        }
      }
      async create(req: Request, res: Response, next: NextFunction) {
        try {
          const { title, description, type, price } = req.body
          
          if (req.file){
            const picture = req.file.path 
            const item = await catalogService.createItem(title, description, type, price, picture)
            res.status(200).json({ message: 'Элемент создан', item })
          }
        } catch (e) {
          next(e)
        }
      }
      async getOne(req: Request, res: Response, next: NextFunction) {
        try {   
        const  id  = parseInt(req.params.id)
        const item = await catalogService.getOne(id)
        res.status(200).json({item, message: 'Элемент отображен' })
        } catch (e) {
          next(e)
        }
      }
      async updateOne(req: Request, res: Response, next: NextFunction) {
        try {   
        const  id  = parseInt(req.params.id)
        const changes = req.body
        const item = await catalogService.updateOne(id, changes)
        res.status(200).json({item, message: 'Элемент обновлен' })
        } catch (e) {
          next(e)
        }
      }
      async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {   
        const  id  = parseInt(req.params.id)
        const item = await catalogService.deleteOne(id)
        res.status(200).json({item, message: 'Элемент удален' })
        } catch (e) {
          next(e)
        }
      }
}

export default new catalogController()