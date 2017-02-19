/**
 * Created by Linweiwei on 2017/1/12.
 */

import {Component, OnInit} from "@angular/core";
import {ProductService} from "../../share/service/product.service";
import {AlertComponent} from "../../share/alert/alert.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../product";
import {Response} from "@angular/http";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {GlobalLoadingComponent} from "../../share/loading/global-loading.component";

@Component({
    selector:'product-list',
    templateUrl:'product-list.component.html',
    styleUrls:['product-list.component.css']
})

export class ProductListComponent extends GlobalLoadingComponent implements OnInit{

    searchForm:FormGroup;
    products:Array<Product>=[];
    page:number = 1;
    size:number = 12;
    totalElements:number;

    constructor(
        private productService:ProductService,
        private modalService: NgbModal,
        private fb:FormBuilder,
        private router:Router,
        private activatedRoute:ActivatedRoute
    ){
        super();
        this.searchForm = fb.group({
            'category':['all'],
            'name':['']
        })
    }

    ngOnInit(): void {
        this.getProducts({"type":"all"});
    }

    getProducts(param?:any):void{
        let url =`api/product/page?page=${this.page-1}&size=${this.size}`;
        if(param){
            if(param["type"]){
                url += "&type=" + param["type"];
            }
            if(param["name"]){
                url += "&name=" + param["name"];
            }
        }
        else {
            url += "&type=all";
        }
        this.showLoading();
        console.log(this.loading);
        this.productService.getJson(url)
            .then((response:Response)=>{
                this.cancelLoading();
                let databack = JSON.parse(response["_body"]);
                for(let item of databack.content){
                    item.images = item.images.substring(0,item.images.indexOf(','));
                }
                this.products = databack.content;
                this.totalElements  = databack.totalElements;
            })
            .catch((error:any)=>{
                this.cancelLoading();
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
                    this.getProducts({});
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

    onSubmit(form:any):void{
        console.log(form);
        let param ={"type":form.category};
        if(form.name != ""){
            param["name"] = form.name;
        }
        this.getProducts(param);
    }

    edit(product:any){
        console.log(product);
        //因为本级是第二级的导航，所以要获取上级的url path
        let parentPath = this.activatedRoute.parent.routeConfig.path;
        this.router.navigate([`${parentPath}/update`, { id:product.productId}]);
    }
}