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
import {StateService} from "../../share/service/state.service";
import {NotificationsService} from "angular2-notifications/dist";
import {Base64} from "js-base64";

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
    confirmStatus:boolean = false;
    toDeleteProduct:any;
    showType:string;

    public options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    }

    constructor(
        private productService:ProductService,
        private modalService: NgbModal,
        private fb:FormBuilder,
        private router:Router,
        private activatedRoute:ActivatedRoute,
        private stateService:StateService,
        private notificationService:NotificationsService
    ){
        super();
        this.searchForm = fb.group({
            'category':['all'],
            'status':['all'],
            'name':['']
        })
        this.showType = this.stateService.productListShowType;
    }

    ngOnInit(): void {
        this.getProducts({"type":"all","status":"all"});
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
            if(param["status"]){
                url += "&status=" + param["status"];
            }
        }
        else {
            url += "&type=all&status=all";
        }
        this.showLoading();
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
        this.confirmStatus = true;
        this.toDeleteProduct = product;

    }

    confirm():void{
        this.productService.deleteJson("api/product/"+this.toDeleteProduct.productId)
            .then((res:any)=>{
                this.confirmStatus = false;
                if(res["_body"] == "success"){
                    //this.openModel("删除成功");
                    this.getProducts({"type":"all","status":"all"});
                }
                else{
                    let responseBody = JSON.parse(res["_body"]);
                    this.openModel(responseBody.message);
                }
            })
            .catch((error:any)=>{
                this.confirmStatus = false;
                console.log(error);
                this.openModel("系统错误，请联系管理员");
            })
    }

    cancel():void{
        this.confirmStatus = false;
    }

    onSubmit(form:any):void{
        let param ={"type":form.category,"status":form.status};
        if(form.name != ""){
            param["name"] = form.name;
        }
        this.getProducts(param);
    }

    edit(product:any){
        //因为本级是第二级的导航，所以要获取上级的url path
        let parentPath = this.activatedRoute.parent.routeConfig.path;
        this.router.navigate([`${parentPath}/update`, { id:product.productId}]);
    }

    editDesc(product:any){
        //因为本级是第二级的导航，所以要获取上级的url path
        let parentPath = this.activatedRoute.parent.routeConfig.path;

        //******************* !!! 这里特别注意，先查询下个页面的富文本内容，不然富文本有时候初始化不了 **********************//
        this.showLoading();
        this.productService.getJson(`api/productDesc/${product.productId}`)
            .then((response:Response)=>{
                this.cancelLoading();
                if(response.status == 204){
                    this.stateService.productDesc.description = "商品信息";
                }
                else{
                    let desc = JSON.parse(response["_body"]);
                    this.stateService.productDesc = desc;
                    this.stateService.productDesc.description = Base64.decode(desc.description);
                }
                //查询完毕，跳转页面
                this.router.navigate([`${parentPath}/description`, { id:product.productId}]);
            })
            .catch((error:any)=>{
                this.notificationService.error('错误',"系统错误，请联系管理员");
            })
    }

    view(product:any){
        let parentPath = this.activatedRoute.parent.routeConfig.path;
        this.router.navigate([`${parentPath}/detail`,{id:product.productId}]);
    }

    toggleShowType(type:string){
        this.showType = this.stateService.productListShowType = type;
    }
}