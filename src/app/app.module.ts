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
import {UploadService} from "./share/service/upload.service";
import {NgbModule, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertComponent} from "./share/alert/alert.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "./share/service/product.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        ChartsModule,
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        DashboardComponent,
        ProductListComponent,
        ProductEditComponent
    ],
    providers:[
        NgbModal,
        UploadService,
        ProductService
    ],
    entryComponents: [AlertComponent],
    bootstrap: [ AppComponent ]
})
export class AppModule {


}
