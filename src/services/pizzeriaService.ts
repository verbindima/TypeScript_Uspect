import { Pizzeria } from "../entity/pizzeria.entity"

class PizzeriaService {
    async createPizzeria(
      title: string, 
      city: string, 
      address: string
      ) {
       const pizzeria = Pizzeria.create({title, city, address})
       await pizzeria.save()
       return pizzeria
    }
    async getPizzerias(city:string,
      limit: number,
      page: number 
      ) {
        if (city === 'none') {
            const pizzerias = await Pizzeria.findAndCount({
                skip: page, 
                take: limit})
            return pizzerias
        }
        const pizzerias = await Pizzeria.findAndCount({
                where: {city: city},
                skip: page, 
                take: limit})
        return pizzerias
    }
    async deleteOne(id:number) {
        const pizzeria = Pizzeria.delete(id)
     return pizzeria
    }
    async updateOne(id:number, changes:Pizzeria) {
        const pizzeria = Pizzeria.update(id, changes)
     return pizzeria
       }
    async getOne(id: number) {
        const pizzeria = Pizzeria.findByIds([id])
        return pizzeria
    }
  }
    export default new PizzeriaService()