/**
 * Created by Linweiwei on 2017/1/12.
 */
import {Component, ViewChild} from "@angular/core";
import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {UploadService} from "../share/service/upload.service";
import {ProductImage} from "./ProductImage";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertComponent} from "../share/alert/alert.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../share/service/product.service";
import {GlobalLoadingComponent} from "../share/loading/global-loading.component";

@Component({
    selector:'product-edit',
    templateUrl:'product-edit.component.html',
    styleUrls:['product-edit.component.css']
})

export class ProductEditComponent extends GlobalLoadingComponent{

    productForm:FormGroup;
    productImages:Array<ProductImage> = [];
    @ViewChild('fileInput')
    fileInput:any;
    uploadLoading:boolean = false;

    constructor(
        private http: Http,
        private uploadService:UploadService,
        private modalService: NgbModal,
        private fb:FormBuilder,
        private productService:ProductService
    ){
        super();
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
        if(files[0].size>=1048576){
            this.openModel("图片最大不能超过1M");
            return;
        }
        this.uploadLoading = true;
        this.uploadService.uploadSingleFile(files[0])
            .then((result:any)=>{
                this.uploadLoading =false;
                if(result.errorCode){
                    this.openModel(result.message);
                }
                else{
                    this.productImages.push(result as ProductImage);
                    console.log(this.productImages);
                }
            })
            .catch((error:any)=>{
                this.uploadLoading = false;
                this.openModel("系统故障，请联系管理员");
            })
    }


    onSubmit(form:any):void{
          form["images"] = this.productImages;
          this.showLoading();
          this.productService.postJson("api/product",form)
              .then((res:Response)=>{
                  this.cancelLoading();
                  if(res["_body"] == "success"){
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
                  else{
                      let responseBody = JSON.parse(res["_body"]);
                      this.openModel(responseBody.message);
                  }
        });
    }

    openModel(msg:string) {
        const modalRef = this.modalService.open(AlertComponent,{backdrop:"static",keyboard:false,size:"sm"});
        modalRef.componentInstance.msg = `${msg}`;
    }
}