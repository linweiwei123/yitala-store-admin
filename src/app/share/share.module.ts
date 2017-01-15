/**
 * Created by Linweiwei on 2016/12/22.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "./layout/header/header.component";
import {AlertComponent} from "./alert/alert.component";
import {ShowAuthedDirective} from "./directive/show-authed.directive";
@NgModule({
    imports:[
        CommonModule,
        FormsModule
    ],
    declarations:[
        HeaderComponent,
        AlertComponent,
        ShowAuthedDirective
    ],
    providers:[],
    exports:[
        HeaderComponent,
        AlertComponent,
        ShowAuthedDirective
    ]
})

export class ShareModule{

}
