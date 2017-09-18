/**
 * Created by yitala on 2017/9/2.
 */

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ProductService} from "../share/service/product.service";
import {NotificationsService} from "angular2-notifications";
import {BlogImage} from "./blog-image.model";
import {UploadService} from "../share/service/upload.service";
@Component({
    selector:'file-manager',
    templateUrl:'./file-manager.component.html',
    styleUrls:['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit{

    imageArr:Array<BlogImage> = [];

    @Input()
    urlType:string;

    @Output()
    onSelect = new EventEmitter();

    @ViewChild('fileInput')
    fileInput:any;
    loading:boolean = false;

    public options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    }

    constructor(
        private productService:ProductService,
        private notificationService:NotificationsService,
        private uploadService:UploadService
    ){}

    ngOnInit(): void {
        this.getList();
    }

    getList(){
        this.imageArr = [];
        this.loading = true;
       this.productService.get(`api/filemanager/list/${this.urlType}`,{})
           .subscribe(
               (res)=>{
                   this.loading = false;
                   this.imageArr.push({
                       urlSlim:"none",
                       url:"none"
                   });
                   for(let item of res){
                       let obj = {
                           urlSlim:item +"?&imageView2/1/w/120/h/120",
                           url:item
                       };
                       this.imageArr.push(obj);
                   }
               },
               (error)=>{
                   this.notificationService.error("错误","获取图片列表错误，请联系管理员")
               }
           )
    }

    fileChange(event:any):void{
        let files = event.target.files;
        if(files[0].size>=1048576){
            this.notificationService.warn('提示',"图片最大不能超过1M");
            this.fileInput.nativeElement.value="";
            return;
        }
        this.loading = true;
        this.uploadService.uploadFile(`api/filemanager/upload/${this.urlType}`,files[0])
            .then((result:any)=>{
                this.loading =false;
                this.fileInput.nativeElement.value="";
                if(result.errorCode){
                    this.notificationService.error('错误',result.message);
                }
                else{
                    this.getList();
                }
            })
            .catch((error:any)=>{
                this.loading = false;
                this.notificationService.error('错误',"系统故障，请联系管理员");
            })
    }

    select(item:BlogImage):void{
        this.onSelect.emit(item.url);
    }
}