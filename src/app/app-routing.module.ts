import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductListComponent} from "./product/list/product-list.component";
import {ProductEditComponent} from "./productedit/product-edit.component";
import {AuthGuard} from "./share/guard/auth-guard.component";
import {LoginComponent} from "./login/login.component";
import {NoAuthedGuard} from "./share/guard/no-authed-guard.component";
import {ProductUpdateComponent} from "./product/update/product-update.component";


const appRoutes: Routes = [

    {   path: 'login', component: LoginComponent,canActivate:[NoAuthedGuard]},
    {   path: 'dashboard', component: DashboardComponent,data:{name:'仪表盘'},canActivate:[AuthGuard]},
    {   path: 'productList', loadChildren:'./product/product.module#ProductModule'},
    {   path: 'productEdit', component: ProductEditComponent,data:{name:'商品发布'},canActivate:[AuthGuard]},
    {
        path:'order',loadChildren:'./order/order.module#OrderModule'
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];


@NgModule({
    imports:[RouterModule.forRoot(appRoutes,{ useHash: true })],
    exports:[RouterModule]
})

export class AppRoutingModule{

}