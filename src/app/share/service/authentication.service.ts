/**
 * Created by yitala on 2017/1/15.
 */

import {Injectable} from "@angular/core";
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {User} from "../models/user.model";
import {JwtService} from "./jwt.service";

@Injectable()
export class AuthenticationService{

    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private jwtService:JwtService
    ){}

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