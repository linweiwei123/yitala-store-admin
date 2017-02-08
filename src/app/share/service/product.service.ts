/**
 * Created by Linweiwei on 2017/1/13.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
@Injectable()
export class ProductService{

    constructor(
        private http:Http,
        private authenticationServie:AuthenticationService
    ){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    postJson(url:string,params:any){
        let options:RequestOptionsArgs = {};
        options.headers = this.setHeaders();
        return this.http.post(url, params,options)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }

    getJson(url:string,params?:any){
        let options:RequestOptionsArgs = {};
        options.headers = this.setHeaders();
        options.body = params;
        return this.http.get(url,options)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }

    deleteJson(url:string,params?:any){
        let options:RequestOptionsArgs = {};
        options.headers = this.setHeaders();
        options.body = params;
        return this.http.delete(url,options)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }

    private setHeaders():Headers{
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');
        headers.append("Authorization",this.authenticationServie.getAuthorizationToken());
        return headers;
    }
}