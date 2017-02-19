/**
 * Created by yitala on 2017/2/19.
 */

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "./list/product-list.component";
import {AuthGuard} from "../share/guard/auth-guard.component";
import {ProductUpdateComponent} from "./update/product-update.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const productRoutes:Routes = [
    {
        path:'update',
        component:ProductUpdateComponent,
        data:{name:'商品修改'},
        canActivate:[AuthGuard]
    },
    {
        path:'',
        component:ProductListComponent,
        data:{name:'商品列表'},
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
        RouterModule.forChild(productRoutes)
    ],
    declarations:[
        ProductListComponent,
        ProductUpdateComponent
    ]
})

export class ProductModule{

}