/**
 * Created by yitala on 2017/8/29.
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../share/guard/auth-guard.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SimpleNotificationsModule} from "angular2-notifications";
import {ShareModule} from "../share/share.module";
import {BlogManagerComponent} from "./manager/blog-manager.component";
import {BlogEditComponent} from "./edit/blog-edit.component";
import {CKEditorModule} from "ng2-ckeditor";
import {FileManagerComponent} from "../common/file-manager.component";

const BlogRoutes = [
    {
        path:'manager',component:BlogManagerComponent,
        data:{name:'博客管理'},
        canActivate:[AuthGuard]
    },
    {
        path:'edit/:id',component:BlogEditComponent,
        data:{name:'博客编辑'},
        canActivate:[AuthGuard]
    },
    {
        path:'edit',component:BlogEditComponent,
        data:{name:'博客发布'},
        canActivate:[AuthGuard]
    },
    {
        path:'',component:BlogManagerComponent,
        data:{name:'博客管理'},
        canActivate:[AuthGuard]
    }
]

@NgModule({
    imports:[
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(BlogRoutes),
        NgbModule.forRoot(),
        CKEditorModule,
        SimpleNotificationsModule.forRoot(),
        ShareModule
    ],
    declarations:[
        BlogManagerComponent,
        BlogEditComponent,
        FileManagerComponent
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class BlogModule{

}