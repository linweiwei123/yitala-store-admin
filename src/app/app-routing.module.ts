import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductListComponent} from "./productlist/product-list.component";
import {ProductEditComponent} from "./productedit/product-edit.component";
import {AuthGuard} from "./share/guard/auth-guard.component";
import {LoginComponent} from "./login/login.component";
import {NoAuthedGuard} from "./share/guard/no-authed-guard.component";


const appRoutes: Routes = [

    {   path: 'login', component: LoginComponent,canActivate:[NoAuthedGuard]},
    {   path: 'dashboard', component: DashboardComponent,data:{name:'仪表盘'},canActivate:[AuthGuard]},
    {   path: 'productList', component: ProductListComponent,data:{name:'商品列表'},canActivate:[AuthGuard]},
    {   path: 'productEdit', component: ProductEditComponent,data:{name:'商品编辑'},canActivate:[AuthGuard]},
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}