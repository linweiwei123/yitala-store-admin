/**
 * Created by Linweiwei on 2017/1/13.
 */

import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
@Injectable()
export class UploadService{

    constructor(
        private http:Http
    ){}

    uploadSingleFile(file:any){
        let headers = new Headers();
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
}
