/**
 * Created by Administrator on 2016/11/25.
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./share/service/authentication.service";
import {LoginService} from "./share/service/login.service";

@Component({
    selector:'my-app',
    templateUrl:'app.component.html',
    styleUrls:['app.component.css'],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})

export class AppComponent implements OnInit{

    isSignOn:boolean = false;
    public options = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true
    }

    constructor(
        private authenticationService:AuthenticationService,
        private loginService:LoginService
    ){}

    ngOnInit(): void {
        //首次初始化未登录
        this.loginService.autoLogin();
        this.authenticationService.isAuthenticated.subscribe(
            (isAuthenticated)=>{
                if(isAuthenticated){
                    this.isSignOn = true;
                }
                else this.isSignOn = false;
            }
        )
        $(".container-fluid").css("min-height",$(window).height()-120);
    }

    //解决footer无法一直在底部的问题
    onResize(event:any):void{
        $(".container-fluid").css("min-height",$(window).height()-120);
    }

}