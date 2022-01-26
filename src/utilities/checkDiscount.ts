import { isString } from "util"
import { User } from "../entity/user.entity"

interface itemList {
     item: string, 
     type: string,
     price: number, 
     count: number,
     img: string 
}
export default function checkDiscount ( 
    total: itemList[], 
    birthday: Date, 
    priceOrderWithoutDiscount: number) :number {
    
      let pizzaCount = 0
      let discount = 0
      pizzaCount = total.reduce((prev, next) => {
        if (next.type === 'Пицца') {
          pizzaCount = pizzaCount + next.count 
        }
        return pizzaCount
      }, 0)

      if (pizzaCount >= 2 && isCola(total) === true) {
        discount = discount + 100
      } 
      
      if (pizzaCount >= 3) {
        
        discount = discount + smallestPrice(total) / 2
      } 

      if (isBirthdayToday(birthday)) {
        discount = discount + ((priceOrderWithoutDiscount - discount)  * 15 / 100)
      }

      return discount
      
}
const isCola = (total: itemList[]) => {
    for (const key in total) {
      if (total[key].item === 'Coka-Cola') {
        return true
      }
    }
    return false
  }

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

  const smallestPrice = (total: itemList[]) => {
    let arr = []
    for (const key in total) {
        if (total[key].type === 'Пицца') {
          arr.push(total[key].price / total[key].count)
        }
    }
    const price = arr.reduce((r, e) => r < e ? r : e )
    return price
  }

