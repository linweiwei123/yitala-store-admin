import {Http, Request, Response, Headers, RequestOptions, RequestOptionsArgs, XHRBackend} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {JwtService} from "./jwt.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {TimeoutError} from "rxjs/Rx";
import {NgProgress} from "ngx-progressbar";

@Injectable()
export class ExtendHttpInterceptor extends Http{

    private ajaxQueue:Array<any> = [];

    constructor(
        backend:XHRBackend,
        options:RequestOptions,
        public http:Http,
        private jwtService:JwtService,
        private router:Router,
        private authService:AuthenticationService,
        private ngProgress:NgProgress
    ){
        super(backend,options);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = this.jwtService.getToken();
        if(typeof url === "string"){
            options = options || {};
            if(typeof options.headers === "undefined"){
                options.headers = new Headers()
            }
            options.headers.set("Authorization",token);
        }
        else{
            url.headers.set("Authorization",token);
        }
        this.ngProgress.start();
        this.ajaxQueue.push(1);
        return super.request(url,options)
            .timeout(15000)
            .map(
                (res)=>{
                    this.ajaxQueue.pop();
                    if(this.ajaxQueue.length==0){
                        this.ngProgress.done();
                    }
                    return res;
                }
            )
            .catch(this.handleError);
    }


    public handleError = (res:Response) => {
        this.ajaxQueue.pop();
        if(this.ajaxQueue.length==0){
            this.ngProgress.done();
        }
        if(res instanceof TimeoutError){
            return Observable.throw("请求超时，请检查您的网络连接情况～");
        }
        else if(401 === res.status || 403 === res.status){
            this.authService.cleanAuth();
            this.router.navigate(["login"]);
        }
        else if(500 === res.status){
            console.log(res);
            return Observable.throw("系统异常，请联系管理员修复");
        }
        else if(-1 === res.status || 502 === res.status || 504 === res.status){
            return Observable.throw("远程服务器没有响应");
        }
        console.log(res);
        return Observable.throw(res);
    }





}