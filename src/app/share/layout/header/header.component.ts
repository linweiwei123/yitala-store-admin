/**
 * Created by Linweiwei on 2016/12/22.
 */

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {LoginService} from "../../service/login.service";
@Component({
    selector:"layout-header",
    templateUrl:"header.component.html"
})

export class HeaderComponent implements OnInit{

    currentRoute:any;

    constructor(
        private route: ActivatedRoute,
        private router:Router,
        private authenticationService:AuthenticationService,
        private loginService:LoginService
    ){
    }

    ngOnInit(): void {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event:any) => {
                let currentRoute = this.route.root;
                while (currentRoute.children[0] !== undefined) {
                    currentRoute = currentRoute.children[0];
                }
                let obj = currentRoute.snapshot.data;
                //console.log(obj);
                this.currentRoute = obj["name"];
            })
    }

    logout():void{
        this.loginService.logout();
        this.router.navigate(["/login"]);
    }
}