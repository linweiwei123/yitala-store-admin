/**
 * Created by Linweiwei on 2017/1/12.
 */
import {Component, ViewChild} from "@angular/core";
import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {UploadService} from "../share/service/upload.service";
import {ProductImage} from "./ProductImage";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../share/service/product.service";
import {GlobalLoadingComponent} from "../share/loading/global-loading.component";
import {NotificationsService} from "angular2-notifications";

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
    loading:boolean = false;
    uploadLoading:boolean = false;
    public options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    }

    constructor(
        private http: Http,
        private uploadService:UploadService,
        private fb:FormBuilder,
        private productService:ProductService,
        private notificationService:NotificationsService
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
            'recommended':[false],
            'description':['',Validators.required],
            'color':[''],
            'size':[''],
            'images':['']
        })
    }

    fileChange(event:any):void{
        let files = event.target.files;
        if(files[0].size>=1048576){
            this.notificationService.warn('提示',"图片最大不能超过1M");
            this.fileInput.nativeElement.value="";
            return;
        }
        this.uploadLoading = true;
        this.uploadService.uploadSingleFile(files[0])
            .then((result:any)=>{
                this.uploadLoading =false;
                this.fileInput.nativeElement.value="";
                if(result.errorCode){
                    this.notificationService.error('错误',result.message);
                }
                else{
                    this.productImages.push(result as ProductImage);
                    console.log(this.productImages);
                }
            })
            .catch((error:any)=>{
                this.uploadLoading = false;
                this.notificationService.error('错误',"系统故障，请联系管理员");
            })
    }


    onSubmit(form:any):void{
          form["images"] = this.productImages;
          this.loading = true;
          this.productService.postJson("api/product",form)
              .then((res:Response)=>{
                  this.loading = false;
                  if(res["_body"] == "success"){
                      this.notificationService.success('成功',"保存成功");
                      //清空内容并重新初始化
                      this.productForm = this.fb.group({
                          'name':['',Validators.required],
                          'brand':['',Validators.required],
                          'type':['watch',Validators.required],
                          'price':['',Validators.required],
                          'discount':[''],
                          'status':['inline',Validators.required],
                          'recommended':[false],
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
                      this.notificationService.error('错误',responseBody.message);
                  }
        });
    }

    removeImage(img:ProductImage):void{
        this.productImages = this.productImages.filter((item)=>{
            return item != img;
        })
    }
}