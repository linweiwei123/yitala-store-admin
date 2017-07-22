/**
 * Created by yitala on 2017/2/19.
 */

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "./list/product-list.component";
import {AuthGuard} from "../share/guard/auth-guard.component";
import {ProductUpdateComponent} from "./update/product-update.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ShareModule} from "../share/share.module";
import {ProductDetailComponent} from "./detail/product-detail.component";
import {DescriptionComponent} from "./desription/description.component";
import { CKEditorModule } from 'ng2-ckeditor';
import {SummernoteModule} from "ng2-alt-summernote";
import {SimpleNotificationsModule} from "angular2-notifications";

const productRoutes:Routes = [
    {
        path:'update',
        component:ProductUpdateComponent,
        data:{name:'商品修改'},
        canActivate:[AuthGuard]
    },
    {
        path:'description',
        component:DescriptionComponent,
        data:{name:'商品信息编辑'},
        canActivate:[AuthGuard]
    },
    {
        path:'detail',
        component:ProductDetailComponent,
        data:{name:'商品详情'},
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
        ShareModule,
        RouterModule.forChild(productRoutes),
        CKEditorModule,
        SummernoteModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations:[
        ProductListComponent,
        ProductUpdateComponent,
        ProductDetailComponent,
        DescriptionComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ProductModule{

}