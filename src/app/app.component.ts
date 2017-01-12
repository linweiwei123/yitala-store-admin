/**
 * Created by Administrator on 2016/11/25.
 */
import {Component, OnInit} from '@angular/core';
import {UserService} from "./shared/service/user.service";

@Component({
    selector:'my-app',
    templateUrl:'app.component.html',
    styleUrls:[],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})

export class AppComponent implements OnInit{
    title = '英雄帖';

    constructor(
    ){}

    ngOnInit(): void {
        $(".container-fluid").css("min-height",$(window).height()-120);
    }

    //解决footer无法一直在底部的问题
    onResize(event:any):void{
        $(".container-fluid").css("min-height",$(window).height()-120);
    }

}