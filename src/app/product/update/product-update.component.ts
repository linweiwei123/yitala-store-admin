/**
 * Created by Linweiwei on 2017/1/12.
 */
import {Component, ViewChild, OnInit} from "@angular/core";
import {Http, Response} from "@angular/http";
import {UploadService} from "../../share/service/upload.service";
import {ProductImage} from "../../productedit/ProductImage";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../share/service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalLoadingComponent} from "../../share/loading/global-loading.component";
import {NotificationsService} from "angular2-notifications";

@Component({
    selector:'product-update',
    templateUrl:'product-update.component.html',
    styleUrls:['product-update.component.css']
})

export class ProductUpdateComponent extends GlobalLoadingComponent implements OnInit{

    productForm:FormGroup;
    productImages:Array<ProductImage> = [];
    @ViewChild('fileInput')
    fileInput:any;
    productId:string;
    updateLoading:boolean = false;
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
        private activedRoute:ActivatedRoute,
        private router:Router,
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
        });
        activedRoute.params.subscribe(params=>{
            this.productId = params["id"];
        });
    }

    ngOnInit(): void {
        if(this.productId){
            //查询loading
            this.updateLoading = true;
            this.productService.getJson(`api/product/${this.productId}`)
                .then((response:Response)=>{
                    this.updateLoading = false;
                     let data = JSON.parse(response["_body"]);
                     for(let item in data){
                         if(this.productForm.controls[item]){
                             this.productForm.controls[item].setValue(data[item]);
                         }
                     }
                     let imageUrlsStr = data.images;
                     let imageUrlArr = imageUrlsStr.split(",");
                     for(let i=0;i<imageUrlArr.length-1;i++){
                         let productImage = new ProductImage();
                         productImage.fileUrl = imageUrlArr[i];
                         this.productImages.push(productImage);
                     }
                })
                .catch((error:any)=>{
                    this.updateLoading =false;
                    console.log(error);
                    this.notificationService.error('错误',"系统错误，请联系管理员");
                })
        }
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
                this.uploadLoading = false;
                this.fileInput.nativeElement.value="";
                if(result.errorCode){
                    this.notificationService.error('错误',result.message);
                }
                else{
                    this.productImages.push(result as ProductImage);
                }
            })
            .catch((error:any)=>{
                this.uploadLoading =false;
                this.notificationService.error('错误',"系统故障，请联系管理员");
            })
    }


    onSubmit(form:any):void{
          form["images"] = this.productImages;
          if(this.productId){
              form["productId"] = this.productId;
          }
          this.updateLoading = true;
          this.productService.postJson("api/product",form)
              .then((res:Response)=>{
                  this.updateLoading = false;
                  if(res["_body"] == "success"){
                      this.notificationService.success('成功',"保存成功");
                      this.backToList();
                  }
                  else{
                      let responseBody = JSON.parse(res["_body"]);
                      this.notificationService.error('错误',responseBody.message);
                  }
        });
    }


    backToList():void{
        this.router.navigate(['/productList']);
    }
}