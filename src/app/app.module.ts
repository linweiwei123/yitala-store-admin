import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from "./app.component";
import './rxjs-extensions';
import '../assets/css/styles.css';
import {ShareModule} from "./share/share.module";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChartsModule} from "ng2-charts";
import {SidebarComponent} from "./share/layout/sidebar/sidebar.component";
import {ProductListComponent} from "./productlist/product-list.component";
import {ProductEditComponent} from "./productedit/product-edit.component";
import {ImageUploadModule} from "ng2-imageupload";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ShareModule,
        AppRoutingModule,
        ChartsModule,
        ImageUploadModule
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        DashboardComponent,
        ProductListComponent,
        ProductEditComponent
    ],
    providers:[],
    bootstrap: [ AppComponent ]
})
export class AppModule {


}
