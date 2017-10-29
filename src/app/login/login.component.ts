import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../share/service/authentication.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../share/service/login.service";
/**
 * Created by yitala on 2017/1/15.
 */

@Component({
    templateUrl:'login.component.html'
})

export class LoginComponent implements OnInit{

    error:string = '';
    loginForm:FormGroup;
    loading:boolean = false;

    constructor(
        private router:Router,
        private loginService:LoginService,
        private fb:FormBuilder
    ){
        this.loginForm = this.fb.group({
            'username':['',Validators.required],
            'password':['',Validators.required]
        })
    }

    ngOnInit(){
    }

    submitForm(form:any){
        this.loading = true;
        this.loginService.login(form["username"],form["password"])
            .subscribe(
                (result:any)=>{
                    console.log(result);
                    if(result == true){
                        this.router.navigate(["/dashboard"]);
                    }
                    else{
                        this.error = "账号或者密码错误";
                        this.loading = false;
                    }
                },
                (error:any)=>{
                    this.error = "账号或者密码错误";
                    this.loading = false;
                }
            );
    }
}