/**
 * Created by Linweiwei on 2016/12/22.
 */

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "./layout/header/header.component";
import {AlertComponent} from "./alert/alert.component";
import {ShowAuthedDirective} from "./directive/show-authed.directive";
import {GlobalLoadingComponent} from "./loading/global-loading.component";
@NgModule({
    imports:[
        CommonModule,
        FormsModule
    ],
    declarations:[
        HeaderComponent,
        AlertComponent,
        GlobalLoadingComponent,
        ShowAuthedDirective
    ],
    providers:[],
    exports:[
        HeaderComponent,
        AlertComponent,
        GlobalLoadingComponent,
        ShowAuthedDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ShareModule{

}
