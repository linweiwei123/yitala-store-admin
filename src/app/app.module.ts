import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {HttpModule, BaseRequestOptions} from '@angular/http';
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
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AlertComponent} from "./share/alert/alert.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "./share/service/product.service";
import {AuthGuard} from "./share/guard/auth-guard.component";
import {AuthenticationService} from "./share/service/authentication.service";
import {LoginComponent} from "./login/login.component";
import {MockBackend} from "@angular/http/testing";
import {FakeBackendProvider} from "./helpers/fake-backend";
import {NoAuthedGuard} from "./share/guard/no-authed-guard.component";

@NgModule({
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ChartsModule,
        ShareModule
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        LoginComponent,
        DashboardComponent,
        ProductListComponent,
        ProductEditComponent
    ],
    providers:[
        AuthGuard,
        AuthenticationService,
        NoAuthedGuard,
        UploadService,
        ProductService
    ],
    entryComponents: [AlertComponent],
    bootstrap: [ AppComponent ]
})
export class AppModule {


}
