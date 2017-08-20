/**
 * Created by yitala on 2017/8/20.
 */

import {Component, OnInit} from "@angular/core";
import {OrderInfo} from "./OrderInfo";
import {Router} from "@angular/router";
import {ProductService} from "../../share/service/product.service";
import {OrderService} from "../../share/service/order.service";
@Component({
    selector:'order-manager',
    templateUrl:'./manager.component.html',
    styleUrls:['./manager.component.css']
})

export class ManagerComponent implements OnInit{

    orderInfoArr:Array<OrderInfo> = [];
    loading:boolean = false;
    total:number;
    page:number = 1;
    size:number = 10;

    constructor(
        private productService:ProductService,
        private orderService:OrderService,
        private router:Router
    ){}

    ngOnInit(): void {
            //this.orderInfoArr = [{"orderCode":"5","images":["http://ojp8ivtxn.bkt.clouddn.com/20170818_【Yintage 意忆中古】vintage 紫色水晶贝母耳坠1.jpeg","http://ojp8ivtxn.bkt.clouddn.com/20170818_【Yintage 意忆中古】vintage 金色螺旋镂空立体耳坠1.jpeg"],"quantity":2,"price":306.0,"date":1503149606000,"words":"好评返现","state":"confirm","products":[{"productId":371,"name":"【Yintage 意忆中古】vintage 紫色水晶贝母耳坠","brand":"未打标款","type":"earring","price":198,"discount":null,"status":"inline","description":"稀有品","color":"紫色","size":"","images":"http://ojp8ivtxn.bkt.clouddn.com/20170818_【Yintage 意忆中古】vintage 紫色水晶贝母耳坠1.jpeg,http://ojp8ivtxn.bkt.clouddn.com/20170818_【Yintage 意忆中古】vintage 紫色水晶贝母耳坠2.jpeg,","createTime":1502987432000,"recommended":false},{"productId":370,"name":"【Yintage 意忆中古】vintage 金色螺旋镂空立体耳坠","brand":"未打标款","type":"earring","price":108,"discount":null,"status":"inline","description":"造型独特","color":"金色","size":"","images":"http://ojp8ivtxn.bkt.clouddn.com/20170818_【Yintage 意忆中古】vintage 金色螺旋镂空立体耳坠1.jpeg,http://ojp8ivtxn.bkt.clouddn.com/20170818_【Yintage 意忆中古】vintage 金色螺旋镂空立体耳坠2.jpeg,http://ojp8ivtxn.bkt.clouddn.com/20170818_【Yintage 意忆中古】vintage 金色螺旋镂空立体耳坠3.jpeg,","createTime":1502987258000,"recommended":false}]},{"orderCode":"4","images":["http://ojp8ivtxn.bkt.clouddn.com/20170729_TRAIFAI 翠法丽vintage白色莱茵石花朵耳夹1.jpeg","http://ojp8ivtxn.bkt.clouddn.com/20170729_ROMAN vintage 绿水晶金色方形耳钉1.jpeg"],"quantity":2,"price":416.0,"date":1502415931000,"words":null,"state":"confirm","products":[{"productId":331,"name":"TRAIFAI 翠法丽vintage白色莱茵石花朵耳夹","brand":"TRAIFAI 翠法丽","type":"earring","price":158,"discount":null,"status":"inline","description":"保存完好～！","color":"银白色","size":"","images":"http://ojp8ivtxn.bkt.clouddn.com/20170729_TRAIFAI 翠法丽vintage白色莱茵石花朵耳夹1.jpeg,http://ojp8ivtxn.bkt.clouddn.com/20170729_TRAIFAI 翠法丽vintage白色莱茵石花朵耳夹2.jpeg,","createTime":1501302274000,"recommended":false},{"productId":334,"name":"ROMAN vintage 绿水晶金色方形耳钉","brand":"ROMAN ","type":"earring","price":258,"discount":null,"status":"inline","description":"保存完好～！","color":"金色、绿色","size":"","images":"http://ojp8ivtxn.bkt.clouddn.com/20170729_ROMAN vintage 绿水晶金色方形耳钉1.jpeg,http://ojp8ivtxn.bkt.clouddn.com/20170729_ROMAN vintage 绿水晶金色方形耳钉2.jpeg,","createTime":1501302821000,"recommended":false}]},{"orderCode":"3","images":["http://ojp8ivtxn.bkt.clouddn.com/20170730_vintage 螺旋金丝珍珠耳钉1.jpeg"],"quantity":1,"price":188.0,"date":1502180159000,"words":null,"state":"confirm","products":[{"productId":342,"name":"vintage 螺旋金丝珍珠耳钉","brand":"未打标款","type":"earring","price":188,"discount":null,"status":"inline","description":"保存完好～！","color":"金色","size":"","images":"http://ojp8ivtxn.bkt.clouddn.com/20170730_vintage 螺旋金丝珍珠耳钉1.jpeg,http://ojp8ivtxn.bkt.clouddn.com/20170730_vintage 螺旋金丝珍珠耳钉2.jpeg,","createTime":1501381836000,"recommended":false}]}];
        this.queryOrders();
    }

    queryOrders(){
        this.loading = true;
        this.productService.get(`api/order/getOrderInfo?page=${this.page-1}&size=${this.size}`,{}).subscribe(
            (data:any)=>{
                this.loading = false;
                this.orderInfoArr = data.list;
                this.total = data.total;
                this.orderService.setOrderInfo(data.list);
            }
        );
    }

    goDetail(item:any):void{
        this.router.navigate(['order/detail',item.orderCode])
    }

}