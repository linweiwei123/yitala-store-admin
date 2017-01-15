/**
 * Created by yitala on 2017/1/15.
 */

import {Injectable} from "@angular/core";
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {Observable} from "rxjs";
@Injectable()
export class AuthGuard implements CanActivate{

    private isAuthenticated:boolean;

    constructor(
        private router:Router,
        private authenticationService:AuthenticationService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
        console.log(111);
        this.authenticationService.isAuthenticated.subscribe(
            (isAuthenticated)=>{
                console.log(isAuthenticated);
                if(!isAuthenticated){
                    this.router.navigate(['/login']);
                }
                else{
                    this.isAuthenticated = isAuthenticated;
                }
            },
            (err)=>{
                console.log(err);
            }
        )
        return this.isAuthenticated;
    }
}