/**
 * Created by yitala on 2017/8/29.
 */

import {Component, OnInit} from "@angular/core";
import {Base64} from "js-base64";
import {ProductService} from "../../share/service/product.service";
import {NotificationsService} from "angular2-notifications";
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "../../share/service/state.service";
import {Blog} from "../manager/Blog";
import {window} from "rxjs/operator/window";


@Component({
    selector:'blog-edit',
    templateUrl:'./blog-edit.component.html',
    styleUrls:['./blog-edit.component.css']
})

export class BlogEditComponent implements OnInit{

    id:number;
    title:string;
    image:string;
    blogAbstract:string;
    ckeditorContent:string;
    config:any;
    public options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    }
    saveLoading:boolean = false;
    blog:Blog = new Blog();
    modalStatus:boolean = false;

    constructor(
        private productService:ProductService,
        private notificationService:NotificationsService,
        private router:Router,
        private activatedRouter:ActivatedRoute,
        private stateService:StateService
    ){
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
            ],
            filebrowserBrowseUrl:"http://oflt40zxf.bkt.clouddn.com/"
        };
        this.activatedRouter.params.subscribe(
            (param)=>{
                this.id = param["id"];
                if(typeof this.id !== "undefined"){
                    this.ckeditorContent = this.stateService.blog.content;
                    this.title = this.stateService.blog.title;
                    this.image = this.stateService.blog.image;
                    this.blogAbstract = this.stateService.blog.blogAbstract;
                    this.blog = this.stateService.blog;
                    if(typeof this.title === "undefined"){
                        this.back();
                    }
                }
            }
        )
    }

    ngOnInit(): void {

    }

    onChange(event:any):void{
        console.log(event);
    }

    submit():void{
        if(this.ckeditorContent.trim() === "" || this.title.trim() === ""|| this.image.trim() === "" || this.blogAbstract.trim() === ""){
            this.notificationService.warn('提示','填写内容不全');
            return;
        }
        this.saveLoading = true;
        let params={}, url;
        if(typeof this.id !=="undefined"){
            url = "api/blog/save";
            params = this.blog;
        }
        else{
            url = "api/blog/create";
        }
        params["title"] = this.title.trim();
        params["image"] = this.image.trim();
        params["blogAbstract"] = this.blogAbstract.trim();
        params["content"] = Base64.encode(this.ckeditorContent);
        this.productService.postJson(url,params)
            .then((res:Response)=>{
                this.saveLoading = false;
                if(res["_body"] == "success"){
                    this.notificationService.success('成功','保存成功');
                    setTimeout(
                        ()=>{
                            this.back();
                        },1000);
                }
                else{
                    let responseBody = JSON.parse(res["_body"]);
                    this.notificationService.error('错误',responseBody.message);
                }
        });
    }

    back():void{
        this.router.navigate(['blog']);
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