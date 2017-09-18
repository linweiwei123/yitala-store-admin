/**
 * Created by yitala on 2017/7/1.
 */

import {Injectable} from "@angular/core";
@Injectable()
export class JwtService{

    saveToken(token:string){
        console.log(token);
        window.localStorage['jwtToken'] = token;
    }

    getToken():string{
        return window.localStorage.getItem('jwtToken');
    }

    destoryToken(){
        window.localStorage.removeItem('jwtToken');
    }

}