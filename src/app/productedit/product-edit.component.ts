/**
 * Created by Linweiwei on 2017/1/12.
 */
import {Component, ViewChild} from "@angular/core";
import {Headers, RequestOptions, Http} from "@angular/http";
import {UploadService} from "../share/service/upload.service";
import {ProductImage} from "./ProductImage";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertComponent} from "../share/alert/alert.component";
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
    @ViewChild('fileInput')
    fileInput:any;

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
            'images':['']
        })
    }

    fileChange(event:any):void{
        let files = event.target.files;
        this.uploadService.uploadSingleFile(files[0])
            .then((result:any)=>{
                console.log(result);
                if(result.errorCode){
                    this.openModel(result.message);
                }
                else{
                    this.productImages.push(result as ProductImage);
                    console.log(this.productImages);
                }
            })
            .catch((error:any)=>{
                this.openModel("系统故障，请联系管理员");
            })
    }


    onSubmit(form:any):void{
          form["images"] = this.productImages;
          console.log(form);
          this.productService.postJson("api/product",form)
              .then((res:any)=>{
                  if(res.errorCode){
                      this.openModel(res.message);
                  }
                  else{
                      this.openModel("保存成功");
                      //清空内容并重新初始化
                      this.productForm = this.fb.group({
                          'name':['',Validators.required],
                          'brand':['',Validators.required],
                          'type':['watch',Validators.required],
                          'price':['',Validators.required],
                          'discount':[''],
                          'status':['inline',Validators.required],
                          'description':['',Validators.required],
                          'color':[''],
                          'size':[''],
                          'images':['']
                      })
                      this.productImages = [];
                      this.fileInput.nativeElement.value="";
                  }
        });
    }

    openModel(msg:string) {
        const modalRef = this.modalService.open(AlertComponent,{backdrop:"static",keyboard:false,size:"sm"});
        modalRef.componentInstance.msg = `${msg}`;
    }
}