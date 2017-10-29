/**
 * Created by Linweiwei on 2017/1/13.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {JwtService} from "./jwt.service";
import {ExtendHttpInterceptor} from "./ExtendHttpInterceptor";
@Injectable()
export class ProductService{

    constructor(
        private http:ExtendHttpInterceptor,
        private jwtService:JwtService
    ){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    postJson(url:string,params:any){
        let options:RequestOptionsArgs = {};
        return this.http.post(url, params,options)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }

    getJson(url:string,params?:any){
        let options:RequestOptionsArgs = {};
        options.body = params;
        return this.http.get(url,options)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }

    deleteJson(url:string,params?:any){
        let options:RequestOptionsArgs = {};
        options.body = params;
        return this.http.delete(url,options)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }

    postForm(url:string,params:any){
        console.log(params);
        let options:RequestOptionsArgs = {};
        options.headers = this.setFormDataHeaders();
        options.params = params;
        return this.http.post(url,params,options)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }

    //***********  新 ************//
    get(url:string,params?:any){
        return this.http.get(url,params)
            .map((res)=>res.json())
    }

    post(url:string,params:any){
        return this.http.post(url,params)
            .map((res:any)=>res.json());
    }

    delete(url:string){
        return this.http.delete(url)
            .map((res:any)=>res.json());
    }


    private setFormDataHeaders():Headers{
        let headers = new Headers();
        headers.append("Content-Type", 'application/x-www-form-urlencoded');
        headers.append("Authorization",this.jwtService.getToken());
        return headers;
    }
}