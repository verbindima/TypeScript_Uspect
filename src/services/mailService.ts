import { User } from "entity/user.entity";
import { ItemList } from "../entity/itemList.entity";
import { Order } from "../entity/order.entity";
import config from "../config/config";
import nodemailer from 'nodemailer';

interface fullOrder{
    id: number
    client: string,
    pizzeria: string,
    summ: number,
    discount: number,
    createdAt: Date,
    itemList: Array<{
        item: string, 
        type: string, 
        price: number, 
        count: number, 
        img: string
    }>
}

class MailService {
    transporter: any | undefined;
    
    constructor() {
        if (config.SMTP_PORT){
        this.transporter = nodemailer.createTransport({
            host: config.HOST, 
            port: parseInt(config.SMTP_PORT),
            secure: false,
            auth: {
                user: config.USER,
                pass: config.PASSWORD
            }
        })
    }
    }

    async sendOrderMail(to: string, order: fullOrder, itemList: Array<ItemList>, user: User ) {
        let orderItemsStr = ""
        for (let key in order.itemList) {
            orderItemsStr = orderItemsStr + `<p><img src="${order.itemList[key].img}" width="189" height="255"> Товар: ${order.itemList[key].item} Количество: ${order.itemList[key].count} Цена: ${order.itemList[key].price} </p>` 
        }
       
         await this.transporter.sendMail({
            from: config.USER,
            to,
            subject: 'Горячий кусочек. Ваш заказ принят.',
            text: '',
            html:
                `   <div>
                        <h1>Горячий кусочек</h1>
                        <h2>Заказ размещен</h2>
                        <h3>Здравствуйте, ${user.name}! Мы получили ваш заказ.</h3>
                        <p>Заказ: № ${order.id}</p>
                        <p>Дата заказа: ${order.createdAt}</p>
                        <h3>Детали заказа:</h3>
                        <p><h4>Сумма заказа: ${order.summ}</h4></p>
                        <p><h4>Сумма скидки: ${order.discount}</h4></p>
                        <p><h4>Список заказа: 
                            ${orderItemsStr}</h4></p>
                    </div>   
                   
                `
        })
    }
}

export default new MailService();
