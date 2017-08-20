/**
 * Created by yitala on 2017/8/20.
 */

import {Component, OnInit} from "@angular/core";
import {OrderInfo} from "../manager/OrderInfo";
import {Product} from "../../product/product";
import {OrderService} from "../../share/service/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../share/service/product.service";
import {NotificationsService} from "angular2-notifications";
@Component({
    selector:'order-detail',
    templateUrl:'./order-detail.component.html',
    styleUrls:['./order-detail.component.css']
})

export class OrderDetailComponent implements OnInit{

    orderInfo:OrderInfo = new OrderInfo;
    orderCode:string;
    products:Array<Product> = [];
    public options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    }


    constructor(
        private orderService:OrderService,
        private productService:ProductService,
        private router:Router,
        private activatedRouter:ActivatedRoute,
        private notificationService:NotificationsService

    ){
        this.activatedRouter.params.subscribe(
            (param)=>{
                this.orderCode = param["id"];
                console.log(param["id"]);
            }
        )
    }

    ngOnInit(): void {
        this.getOrderInfo();
    }

    getOrderInfo(){
        let orderInfo = this.orderService.getOrderInfo(this.orderCode);

        if(orderInfo === null){
            this.router.navigate(['order']);
            return;
        }
        this.orderInfo = orderInfo;
        let products = this.orderInfo == null? []:this.orderInfo.products;
        products.map((item)=>{
            item.images = item.images.substring(0,item.images.indexOf(","));
        })
        this.products = products;
    }

    view(product:any){
        this.router.navigate(['productList/detail',{id:product.productId}]);
    }

    changeState(orderCode:string):void{
        this.productService.post(`api/order/changeState/${orderCode}`,{}).subscribe(
            (res)=>{
                if(res === true){
                    this.notificationService.success('成功',"操作成功");
                    setTimeout(()=>{
                        this.router.navigate(['order']);
                    },1000)
                }
            },
            (error)=>{
                this.notificationService.error('错误',"操作失败");

            }
        )
    }
}