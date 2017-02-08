/**
 * Created by Linweiwei on 2017/1/12.
 */

import {Component, OnInit} from "@angular/core";
import {ProductService} from "../share/service/product.service";
import {AlertComponent} from "../share/alert/alert.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "./product";
import {Response} from "@angular/http";

@Component({
    selector:'product-list',
    templateUrl:'product-list.component.html',
    styleUrls:['product-list.component.css']
})

export class ProductListComponent implements OnInit{

    products:Array<Product>=[];
    page:number = 1;
    size:number = 12;
    totalElements:number;

    constructor(
        private productService:ProductService,
        private modalService: NgbModal
    ){}

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts():void{
        this.productService.getJson(`api/product/page?page=${this.page-1}&size=${this.size}`)
            .then((response:Response)=>{
                console.log(response);
                let databack = JSON.parse(response["_body"]);
                for(let item of databack.content){
                    item.images = item.images.substring(0,item.images.indexOf(','));
                }
                this.products = databack.content;
                this.totalElements  = databack.totalElements;
            })
            .catch((error:any)=>{
                console.log(error);
                this.openModel("系统错误，请联系管理员");
            })
    }

    openModel(msg:string) {
        const modalRef = this.modalService.open(AlertComponent,{backdrop:"static",keyboard:false,size:"sm"});
        modalRef.componentInstance.msg = `${msg}`;
    }

    delete(product:any):void{
        this.productService.deleteJson("api/product/"+product.productId)
            .then((res:any)=>{
                if(res["_body"] == "success"){
                    this.openModel("删除成功");
                    this.getProducts();
                }
                else{
                    let responseBody = JSON.parse(res["_body"]);
                    this.openModel(responseBody.message);
                }
            })
            .catch((error:any)=>{
                console.log(error);
                this.openModel("系统错误，请联系管理员");
            })
    }
}