import {Injectable} from "@angular/core";
import {OrderInfo} from "../../order/manager/OrderInfo";

/**
 * Created by yitala on 2017/8/19.
 */

@Injectable()
export class OrderService{
    private orders:Array<OrderInfo>=[];

    getOrderInfo(id:string):OrderInfo{
        if(this.orders && this.orders){
            let arr = this.orders.filter((item)=>{
                return item.orderCode == id
            });
            return arr.length>0?arr[0]:null;
        }
        return null;
    }

    setOrderInfo(orders:Array<OrderInfo>):void{
        this.orders = orders;
    }

}