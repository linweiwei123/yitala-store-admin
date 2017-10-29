/**
 * Created by yitala on 2017/10/29.
 */

import {Injectable} from "@angular/core";
import {JwtService} from "./jwt.service";
import {ProductService} from "./product.service";
import {User} from "../models/user.model";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService{

    constructor(
        private productService:ProductService,
        private jwtService:JwtService,
        private authService:AuthenticationService
    ){}

    //app启动时检查token是否有效，有效则获取用户，无效则删除用户信息
    autoLogin(){
        console.log(this.jwtService.getToken());
        if(this.jwtService.getToken()){
            this.productService.get("api/user")
                .subscribe(
                    (data:any)=>{
                        let user = new User();
                        user.username = data.username;
                        user.token = this.jwtService.getToken();
                        this.authService.setAuth(user);
                    },
                    (error)=>{
                        console.log("get user error:",error);
                        this.authService.cleanAuth();
                    }
                );
        }
        else {
            this.authService.cleanAuth();
        }
    }

    login(username:string,password:string):Observable<boolean>{
        let param = {username:username,password:password};
        return this.productService.post('api/authenticate',param)
            .map((response:Response)=>{
                //如果有token返回，则认证成功
                if(response["token"]){
                    let user = new User;
                    user.token = response["token"];
                    this.authService.setAuth(user);
                    return true;
                }
                else {
                    this.authService.cleanAuth();
                    return false;
                }
            });
    }

    logout():void{
        this.authService.cleanAuth();
    }
}