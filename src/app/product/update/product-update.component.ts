/**
 * Created by Linweiwei on 2017/1/12.
 */
import {Component, ViewChild, OnInit} from "@angular/core";
import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {UploadService} from "../../share/service/upload.service";
import {ProductImage} from "../../productedit/ProductImage";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertComponent} from "../../share/alert/alert.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../share/service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalLoadingComponent} from "../../share/loading/global-loading.component";

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
    category:string = "all";
    productId:string;
    updateLoading:boolean = false;
    uploadLoading:boolean = false;

    constructor(
        private http: Http,
        private uploadService:UploadService,
        private modalService: NgbModal,
        private fb:FormBuilder,
        private productService:ProductService,
        private activedRoute:ActivatedRoute,
        private router:Router
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
                    this.openModel("系统错误，请联系管理员");
                })
        }
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
                this.uploadLoading = false;
                if(result.errorCode){
                    this.openModel(result.message);
                }
                else{
                    this.productImages.push(result as ProductImage);
                    console.log(this.productImages);
                }
            })
            .catch((error:any)=>{
                this.uploadLoading =false;
                this.openModel("系统故障，请联系管理员");
            })
    }


    onSubmit(form:any):void{
          form["images"] = this.productImages;
          if(this.productId){
              form["productId"] = this.productId;
          }
          this.showLoading();
          this.productService.postJson("api/product",form)
              .then((res:Response)=>{
                  this.cancelLoading();
                  if(res["_body"] == "success"){
                      this.openModel("保存成功");
                      this.backToList();
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

    backToList():void{
        this.router.navigate(['/productList']);
    }
}