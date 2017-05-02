import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { AppComponent } from "./app.component";
import './rxjs-extensions';
import '../assets/css/styles.css';
import {ShareModule} from "./share/share.module";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SidebarComponent} from "./share/layout/sidebar/sidebar.component";
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
import {ProductModule} from "./product/product.module";
import {GlobalLoadingComponent} from "./share/loading/global-loading.component";
import {ChartModule} from "angular2-highcharts";
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';


export function highchartsFactory() {
    return require('highcharts');
}

@NgModule({
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ShareModule,
        ChartModule,
        ProductModule
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        LoginComponent,
        DashboardComponent,
        ProductEditComponent
    ],
    providers:[
        AuthGuard,
        AuthenticationService,
        NoAuthedGuard,
        UploadService,
        ProductService,
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        },
    ],
    entryComponents: [AlertComponent],
    bootstrap: [ AppComponent ]
})
export class AppModule {


}
