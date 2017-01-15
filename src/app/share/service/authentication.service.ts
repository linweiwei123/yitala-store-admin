/**
 * Created by yitala on 2017/1/15.
 */

import {Injectable} from "@angular/core";
import {BehaviorSubject, ReplaySubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {Http, Response} from "@angular/http";

@Injectable()
export class AuthenticationService{

    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private http:Http
    ){}

    login(username:string,password:string):Observable<boolean>{
        let param = {username:username,password:password};
        return this.http.post('api/authenticate',JSON.stringify(param))
                .map((response:Response)=>{
                    //如果有token返回，则认证成功
                    let token = response.json() && response.json().user && response.json().user.token;
                    if(token){
                        this.setAuth(response.json().user);
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


    checkIsAuthenticated():void{
        let currentUser = window.localStorage.getItem('currentUser');
        if(currentUser){
            this.setAuth(JSON.parse(currentUser));
        }
        else{
            this.cleanAuth();
        }
    }

    setAuth(user:User):void{
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        window.localStorage.setItem('currentUser',JSON.stringify(user));
    }

    cleanAuth(){
        this.currentUserSubject.next(new User());
        this.isAuthenticatedSubject.next(false);
        window.localStorage.removeItem('currentUser');
    }
}