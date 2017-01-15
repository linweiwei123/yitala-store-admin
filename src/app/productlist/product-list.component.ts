/**
 * Created by Linweiwei on 2017/1/12.
 */

import {Component, OnInit} from "@angular/core";
import {ProductService} from "../share/service/product.service";
import {AlertComponent} from "../share/alert/alert.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "./product";

@Component({
    selector:'product-list',
    templateUrl:'product-list.component.html',
    styleUrls:['product-list.component.css']
})

export class ProductListComponent implements OnInit{

    products:Array<Product>=[];

    constructor(
        private productService:ProductService,
        private modalService: NgbModal
    ){}

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts():void{
        this.productService.getJson("api/product")
            .then((response:any)=>{
                console.log(response._body);
                let databack = JSON.parse(response._body);
                for(let item of databack){
                    item.images = item.images.substring(0,item.images.indexOf(','));
                }
                this.products = databack;
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
}