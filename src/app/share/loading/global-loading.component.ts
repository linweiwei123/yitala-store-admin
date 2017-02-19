/**
 * Created by yitala on 2017/2/19.
 */

import {Component} from "@angular/core";
@Component({
    selector:'global-loading',
    templateUrl:'global-loading.component.html'
})

export class GlobalLoadingComponent{
    public loading:boolean =false;

    constructor(){
    }

    showLoading() {
        this.loading = true;
    }

    cancelLoading() {
        this.loading = false;
    }
}