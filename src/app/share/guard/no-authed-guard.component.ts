/**
 * Created by yitala on 2017/1/15.
 */

import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {Observable} from "rxjs";

@Injectable()
export class NoAuthedGuard implements CanActivate{


    constructor(
        private authenticationService:AuthenticationService
    ){}

    canActivate():Observable<boolean>|boolean{
        return this.authenticationService.isAuthenticated.take(1).map((isAuth:any) => !isAuth);

    }
}