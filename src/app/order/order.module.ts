/**
 * Created by yitala on 2017/8/20.
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "../share/share.module";
import {RouterModule, Routes} from "@angular/router";
import {SimpleNotificationsModule} from "angular2-notifications";
import {ManagerComponent} from "./manager/manager.component";
import {AuthGuard} from "../share/guard/auth-guard.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OrderDetailComponent} from "./detail/order-detail.component";


const orderRoutes:Routes = [
    {
        path:'manager',component:ManagerComponent,
        data:{name:'订单管理'},
        canActivate:[AuthGuard]
    },
    {
        path:'detail/:id',component:OrderDetailComponent,
        data:{name:'订单详情'},
        canActivate:[AuthGuard]
    },
    {
        path:'',component:ManagerComponent,
        data:{name:'订单管理'},
        canActivate:[AuthGuard]
    }
]

@NgModule({
    imports:[
        CommonModule,
        NgbModule.forRoot(),
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
        RouterModule.forChild(orderRoutes),
        SimpleNotificationsModule.forRoot()
    ],
    declarations:[
        ManagerComponent,
        OrderDetailComponent
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class OrderModule{

}