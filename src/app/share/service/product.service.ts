/**
 * Created by Linweiwei on 2017/1/13.
 */

import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
@Injectable()
export class ProductService{

    constructor(
        private http:Http,
    ){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    postJson(url:string,params:any){
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');
        return this.http.post(url, params,headers)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }

    getJson(url:string,params?:any){
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');
        return this.http.get(url,params)
            .toPromise()
            .then((response:any) => response)
            .catch(this.handleError);
    }
}