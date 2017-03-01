/**
 * Created by yitala on 2017/3/1.
 */

import {Component, OnInit} from "@angular/core";
import {Http,Response} from "@angular/http";
import {ProductService} from "../../share/service/product.service";
import {Router, ActivatedRoute} from "@angular/router";
import {AlertComponent} from "../../share/alert/alert.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../product";
@Component({
    selector:'product-detail',
    templateUrl:'product-detail.component.html',
    styleUrls:['product-detail.component.css']
})

export class ProductDetailComponent implements OnInit{

    productId:string;
    product:Product = new Product();
    img:string = "";
    queryLoading:boolean = false;


    constructor(
        private http:Http,
        private productService:ProductService,
        private modalService: NgbModal,
        private activedRoute:ActivatedRoute,
        private router:Router
    ){
        activedRoute.params.subscribe(params=>{
            this.productId = params["id"];
        });
    }

    ngOnInit(): void {
        if(this.productId){
            //查询loading
            this.queryLoading = true;
            this.productService.getJson(`api/product/${this.productId}`)
                .then((response:Response)=>{
                    this.queryLoading = false;
                    let data = JSON.parse(response["_body"]);
                    this.product = data;
                    let imgs = this.product.images;
                    this.img = imgs.split(",")[0];
                    console.log(this.product);
                })
                .catch((error:any)=>{
                    this.queryLoading =false;
                    console.log(error);
                    this.openModel("系统错误，请联系管理员");
                })
        }
    }

    openModel(msg:string) {
        const modalRef = this.modalService.open(AlertComponent,{backdrop:"static",keyboard:false,size:"sm"});
        modalRef.componentInstance.msg = `${msg}`;
    }

    back():void{
        this.router.navigate(['/productList']);
    }
}