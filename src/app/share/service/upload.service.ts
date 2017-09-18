/**
 * Created by Linweiwei on 2017/1/13.
 */

import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {JwtService} from "./jwt.service";
@Injectable()
export class UploadService{

    constructor(
        private http:Http,
        private jwtService:JwtService,
        private authenticationServie:AuthenticationService
    ){}

    uploadSingleFile(file:any){
        let headers = new Headers();
        headers.append("Authorization",this.jwtService.getToken());
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);

        return new Promise((resolve, reject) => {
            this.http.post("api/fileupload", formData, {
                headers: headers
            }).subscribe(
                res => {
                    resolve(res.json());
                },
                error => {
                    reject(error.json());
                }
            );
        });
    }

    uploadFile(url:string,file:any){
        let headers = new Headers();
        headers.append("Authorization",this.jwtService.getToken());
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);

        return new Promise((resolve, reject) => {
            this.http.post(url, formData, {
                headers: headers
            }).subscribe(
                res => {
                    resolve(res.json());
                },
                error => {
                    reject(error.json());
                }
            );
        });
    }
}
