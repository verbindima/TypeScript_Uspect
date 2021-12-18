import  { Request, Response } from 'express'
import catalogService from "../services/catalogService"
class catalogController {
    async get(req: Request, res: Response) {
        try {   
        const limit = typeof(req.query.limit) !== 'undefined' ? Number(req.query.limit) : 25;
        const page = typeof(req.query.page) !== 'undefined' ? Number(req.query.page) : 0; 
        const type = typeof(req.query.type) !== 'undefined' ? String(req.query.type) : 'none';
        const item = await catalogService.getItems(type, limit, page)
        res.status(200).json({item, message: 'Элементы отображены' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'getItems Error' })
        }
      }
      async create(req: Request, res: Response) {
        try {
          const { title, description, type, price } = req.body
          
          if (req.file){
            const picture = req.file.path 
            const item = await catalogService.createItem(title, description, type, price, picture)
            res.status(200).json({ message: 'Элемент создан', item })
          }
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'createItem Error' })
        }
      }
      async getOne(req: Request, res: Response) {
        try {   
        const  id  = parseInt(req.params.id)
        const item = await catalogService.getOne(id)
        res.status(200).json({item, message: 'Элемент отображен' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'getOneItem Error' })
        }
      }
      async updateOne(req: Request, res: Response) {
        try {   
        const  id  = parseInt(req.params.id)
        const changes = req.body
        const item = await catalogService.updateOne(id, changes)
        res.status(200).json({item, message: 'Элемент обновлен' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'updateOneItem Error' })
        }
      }
      async deleteOne(req: Request, res: Response) {
        try {   
        const  id  = parseInt(req.params.id)
        const item = await catalogService.deleteOne(id)
        res.status(200).json({item, message: 'Элемент удален' })
        } catch (e) {
          console.log(e)
          res.status(400).json({ message: 'deleteOneItem Error' })
        }
      }
}

export default new catalogController()