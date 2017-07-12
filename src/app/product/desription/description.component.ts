/**
 * Created by yitala on 2017/7/12.
 */
import {Component, OnInit} from "@angular/core";
import {Product} from "../product";
import {Http} from "@angular/http";
import {ProductService} from "../../share/service/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertComponent} from "../../share/alert/alert.component";

@Component({
    selector:'product-desc',
    templateUrl:'./description.component.html',
    styleUrls:['./description.component.css']
})

export class DescriptionComponent implements OnInit{

    ckeditorContent:string;
    config:any;
    productId:string;
    product:Product = new Product();
    img:string = "";
    queryLoading:boolean = false;
    saveLoading:boolean = false;

    constructor(
        private productService:ProductService,
        private modalService: NgbModal,
        private activedRoute:ActivatedRoute,
        private router:Router
    ){
        this.ckeditorContent = `<p>My HTML</p>`;
        this.config = {
            uiColor: '#ffffff',
            autoGrow_minHeight:500,
            height:500,
            toolbarGroups : [
                { name: 'basicstyles', groups: [ 'basicstyles'] },
                { name: 'links' },
                { name: 'insert' },
                { name: 'forms' },
                { name: 'paragraph',   groups: [ 'list', 'indent', 'align'] },
                { name: 'tools',item:['Maximize']},
                { name: 'styles' },
                { name: 'colors' }
            ]
        }
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

    onChange(event:any):void{
        console.log(event);
    }

    saveOrUpdate(){
        if(this.ckeditorContent.trim() === ""){
            return;
        }
        this.saveLoading = true;
        let params = {
            "productId":this.productId,
            "description":"dGhpcyBpcyBhIGV4YW1wbGU="
        }
        this.productService.postJson("api/productDesc",params)
            .then((res:Response)=>{
                this.saveLoading = false;
                if(res["_body"] == "success"){
                    this.openModel("保存成功");
                }
                else{
                    let responseBody = JSON.parse(res["_body"]);
                    this.openModel(responseBody.message);
                }
            });
    }


}