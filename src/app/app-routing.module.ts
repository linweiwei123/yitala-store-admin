import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {NeedAuthGuard} from "./login/no-auth-guard.service";
import {ProductListComponent} from "./productlist/product-list.component";
import {ProductEditComponent} from "./productedit/product-edit.component";


const appRoutes: Routes = [


    {   path: 'dashboard', component: DashboardComponent,data:{name:'仪表盘'}},
    {   path: 'productList', component: ProductListComponent,data:{name:'商品列表'}},
    {   path: 'productEdit', component: ProductEditComponent,data:{name:'商品编辑'}},
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