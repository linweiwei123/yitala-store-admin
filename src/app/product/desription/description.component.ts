/**
 * Created by yitala on 2017/7/12.
 */
import {Component, NgZone, OnDestroy, OnInit} from "@angular/core";
import {Product} from "../product";
import {ProductService} from "../../share/service/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {Base64} from "js-base64";
import {NotificationsService} from "angular2-notifications";
import {ProductDesc} from "../../share/models/productDesc.model";
import {StateService} from "../../share/service/state.service";

declare let CKEDITOR:any;

@Component({
    selector:'product-desc',
    templateUrl:'./description.component.html',
    styleUrls:['./description.component.css']
})

export class DescriptionComponent implements OnInit,OnDestroy{


    ckeditorContent:string;
    config:any;
    productId:string;
    product:Product = new Product();
    img:string = "";
    queryLoading:boolean = false;
    saveLoading:boolean = false;
    public options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    }
    //public timer:any;
    public productDesc:ProductDesc = new ProductDesc();
    modalStatus:boolean = false;

    constructor(
        private productService:ProductService,
        private modalService: NgbModal,
        private activedRoute:ActivatedRoute,
        private router:Router,
        private notificationService: NotificationsService,
        private zone:NgZone,
        private stateService:StateService
    ){
        this.productDesc = this.stateService.productDesc;
        this.ckeditorContent = this.stateService.productDesc.description;
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

        //this.saveLoading = true;
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
                })
                .catch((error:any)=>{
                    this.queryLoading =false;
                    console.log(error);
                    this.notificationService.error('错误',"系统错误，请联系管理员");
                })


        }
    }

    ngOnDestroy(): void {
        // console.log(CKEDITOR.instances);
        // //CKEDITOR.instances.des;
        // if (typeof(CKEDITOR) != "undefined"){
        //     for(let name in CKEDITOR.instances){
        //         if (CKEDITOR.instances[name]) {
        //             CKEDITOR.instances[name].destroy();
        //         }
        //         CKEDITOR.replace(name);
        //     }
        // }
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
            "description":Base64.encode(this.ckeditorContent)
        }
        let url = "api/productDesc";
        if(this.productDesc.id){
            params["id"] = this.productDesc.id;
            url = "api/productDescUpdate";
        }
        this.productService.postJson(url,params)
            .then((res:Response)=>{
                this.saveLoading = false;
                if(res["_body"] == "success"){
                    this.notificationService.success('成功','保存成功');
                    this.back();
                }
                else{
                    let responseBody = JSON.parse(res["_body"]);
                    this.notificationService.error('错误',responseBody.message);
                }
            });
    }


    showModal(){
        this.modalStatus = true;
    }

    hideModal(){
        this.modalStatus = false;
    }

    selectImage(event:any){
        this.hideModal();
        this.copyTextToClipboard(event);
        this.notificationService.success('成功','已复制到剪切版');
        console.log(event);
    }

    copyTextToClipboard(text:string){
        let textArea = document.createElement("textarea");

        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = "0";
        textArea.style.left = "0";

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = "0";

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';


        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    }
}