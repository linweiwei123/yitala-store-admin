/**
 * Created by Linweiwei on 2017/1/12.
 */
import {Component} from "@angular/core";
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {UploadService} from "../share/service/upload.service";
import {ProductImage} from "./ProductImage";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertComponent} from "../share/alert/alert.component";
import {error} from "util";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../share/service/product.service";

@Component({
    selector:'product-edit',
    templateUrl:'product-edit.component.html',
    styleUrls:['product-edit.component.css']
})

export class ProductEditComponent{

    productForm:FormGroup;
    productImages:Array<ProductImage> = [];

    constructor(
        private http: Http,
        private uploadService:UploadService,
        private modalService: NgbModal,
        private fb:FormBuilder,
        private productService:ProductService
    ){
        this.http = http;
        this.productForm = fb.group({
            'name':['',Validators.required],
            'brand':['',Validators.required],
            'type':['watch',Validators.required],
            'price':['',Validators.required],
            'discount':[''],
            'status':['inline',Validators.required],
            'description':['',Validators.required],
            'color':[''],
            'size':[''],
            'images':['',Validators.required]
        })
    }

    fileChange(event:any):void{
        let files = event.target.files;
        this.uploadService.uploadSingleFile(files[0])
            .then((result:any)=>{
                if(result.errorCode){
                    this.openModel(result.message);
                }
                else{
                    this.productImages.push(result as ProductImage);
                    console.log(this.productImages);
                }
            })
            .catch((error)=>{
                this.openModel("系统故障，请联系管理员");
            })
    }


    onSubmit(form:any):void{
          form["images"] = this.productImages;
          console.log(form);
          this.productService.postJson("api/product",JSON.stringify(form))
              .then((res)=>{
              console.log(res);
        });
    }

    openModel(msg:string) {
        const modalRef = this.modalService.open(AlertComponent,{ windowClass: 'dark-modal',size: 'sm'});
        modalRef.componentInstance.msg = `${msg}`;
    }
}