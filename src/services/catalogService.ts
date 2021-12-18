import { ItemList } from "entity/itemList.entity"
import { Catalog } from "../entity/catalog.entity"

class CatalogService {
    async createItem(
      title: string, 
      description: string, 
      type: string, 
      price: number, 
      picture: string) {
       const item = Catalog.create({title, description, type, price, picture})
       await item.save()
       return item
    }
    async getItems(type:string,
      limit: number,
      page: number 
      ) {
        if (type === 'none') {
            const items = await Catalog.findAndCount({
                skip: page, 
                take: limit})
            return items
        }
        const items = await Catalog.findAndCount({
                where: {type: type},
                skip: page, 
                take: limit})
        return items
    }
    async deleteOne(id:number) {
        const item = Catalog.delete(id)
     return item
    }
    async updateOne(id:number, changes:Catalog) {
        const item = Catalog.update(id, changes)
     return item
       }
    async getOne(id: number) {
        const item = Catalog.findByIds([id])
        return item
    }
  }
    export default new CatalogService()