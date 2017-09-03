/**
 * Created by yitala on 2017/8/29.
 */

import {Component, OnInit} from "@angular/core";
import {Blog} from "./Blog";
import {ProductService} from "../../share/service/product.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {StateService} from "../../share/service/state.service";
import {Base64} from "js-base64";
@Component({
    selector:'blog-manager',
    templateUrl:'./blog-manager.component.html',
    styleUrls:['./blog-manager.component.css']
})

export class BlogManagerComponent implements OnInit{

    blogArr:Array<Blog> = [];
    loading:boolean = false;
    total:number;
    page:number = 1;
    size:number = 10;
    public options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    }

    constructor(
        private productService:ProductService,
        private notificationService:NotificationsService,
        private router:Router,
        private stateService:StateService
    ){}

    ngOnInit(): void {
        this.queryBlogs();
    }

    queryBlogs(){
        this.loading = true;
        this.productService.get(`api/blog/list?page=${this.page-1}&size=${this.size}`,{}).subscribe(
            (data:any)=>{
                this.loading = false;
                this.blogArr = data.list;
                this.total = data.total;
            }
        );
    }

    goDetail(item:any):void{
        //******************* !!! 这里特别注意，先查询下个页面的富文本内容，不然富文本有时候初始化不了 **********************//
        this.productService.getJson(`api/blog/get/${item.id}`)
            .then((response:Response)=>{
                if(response.status == 204){
                    this.stateService.blog.content = "商品信息";
                }
                else{
                    let blog = JSON.parse(response["_body"]);
                    this.stateService.blog = blog;
                    this.stateService.blog.content = Base64.decode(blog.content);
                }
                //查询完毕，跳转页面
                this.router.navigate(['blog/edit',item.id])
            })
            .catch((error:any)=>{
                this.notificationService.error('错误',"系统错误，请联系管理员");
            })
    }

    create():void{
        this.router.navigate(['blog/edit'])
    }
}