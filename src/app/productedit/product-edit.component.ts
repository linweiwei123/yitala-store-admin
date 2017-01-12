/**
 * Created by Linweiwei on 2017/1/12.
 */
import {Component} from "@angular/core";
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector:'product-edit',
    templateUrl:'product-edit.component.html',
    styleUrls:['product-edit.component.css']
})

export class ProductEditComponent{

    requestUrl: string;
    responseData: any;
    handleError: any;

    constructor(private router: Router,
                private http: Http
    ) {
        this.http = http;
    }

    fileChange(event:any):void{
        let files = event.target.files;
        this.postWithFile(null,files);
    }

    postWithFile (postData: any, files: File[]) {

        let headers = new Headers();
        let formData:FormData = new FormData();
        formData.append('file', files[0], files[0].name);

        if(postData !=="" && postData !== undefined && postData !==null){
            for (var property in postData) {
                if (postData.hasOwnProperty(property)) {
                    formData.append(property, postData[property]);
                }
            }
        }
        var returnReponse = new Promise((resolve, reject) => {
            this.http.post("api/fileupload", formData, {
                headers: headers
            }).subscribe(
                res => {
                    this.responseData = res.json();
                    resolve(this.responseData);
                },
                error => {
                    this.router.navigate(['/login']);
                    reject(error);
                }
            );
        });
        return returnReponse;
    }
}