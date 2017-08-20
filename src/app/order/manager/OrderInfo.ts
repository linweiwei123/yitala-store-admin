/**
 * Created by yitala on 2017/8/20.
 */

import {Product} from "../../product/product";
/**
 * Created by yitala on 2017/8/7.
 */
export class OrderInfo{
    orderCode:string;
    images:Array<String>;
    quantity:number;
    price:number;
    date:string;
    state:string;
    words:string;
    account:string;
    address:string;
    consignee:string;
    consigneePhone:string;
    products:Array<Product>;
}