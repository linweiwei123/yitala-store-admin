/**
 * Created by yitala on 2017/1/15.
 */

import {Injectable} from "@angular/core";
import {BehaviorSubject, ReplaySubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {Http, Response} from "@angular/http";
import {JwtService} from "./jwt.service";
import {ProductService} from "./product.service";

@Injectable()
export class AuthenticationService{

    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private http:Http,
        private productService:ProductService,
        private jwtService:JwtService
    ){}

    //app启动时检查token是否有效，有效则获取用户，无效则删除用户信息
    autoLogin(){
            console.log(this.jwtService.getToken());
        if(this.jwtService.getToken()){
            this.productService.get("api/user")
                .subscribe(
                    (data)=>{
                        console.log("get user:",data);
                        let user = new User();
                        user.username = data.username;
                        user.token = this.jwtService.getToken();
                        this.setAuth(user);
                    },
                    (error)=>{
                        console.log("get user error:",error);
                        this.cleanAuth();
                    }
                );
        }
        else {
            this.cleanAuth();
        }
    }

    login(username:string,password:string):Observable<boolean>{
        let param = {username:username,password:password};
        return this.http.post('api/authenticate',param)
                .map((response:Response)=>{
                    //如果有token返回，则认证成功
                    console.log(response);
                    let responseBody = response["_body"];
                    let token = JSON.parse(responseBody).token;
                    if(token){
                        let user = new User;
                        user.token = token;
                        this.setAuth(user);
                        return true;
                    }
                    else {
                        this.cleanAuth();
                        return false;
                    }
                });
    }

    logout():void{
        this.cleanAuth();
    }


    setAuth(user:User):void{
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    cleanAuth(){
        this.jwtService.destoryToken();
        this.currentUserSubject.next(new User());
        this.isAuthenticatedSubject.next(false);
    }

}