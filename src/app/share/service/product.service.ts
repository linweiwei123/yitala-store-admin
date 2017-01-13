/**
 * Created by Linweiwei on 2017/1/13.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class ProductService{

    constructor(
        private http:Http
    ){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    postJson(url:string,params:any){
        return this.http.post(url, params)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }
}