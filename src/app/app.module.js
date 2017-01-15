"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var app_component_1 = require("./app.component");
require('./rxjs-extensions');
require('../assets/css/styles.css');
var share_module_1 = require("./share/share.module");
var app_routing_module_1 = require("./app-routing.module");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var ng2_charts_1 = require("ng2-charts");
var sidebar_component_1 = require("./share/layout/sidebar/sidebar.component");
var product_list_component_1 = require("./productlist/product-list.component");
var product_edit_component_1 = require("./productedit/product-edit.component");
var upload_service_1 = require("./share/service/upload.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var alert_component_1 = require("./share/alert/alert.component");
var forms_1 = require("@angular/forms");
var product_service_1 = require("./share/service/product.service");
var auth_guard_component_1 = require("./share/guard/auth-guard.component");
var authentication_service_1 = require("./share/service/authentication.service");
var login_component_1 = require("./login/login.component");
var testing_1 = require("@angular/http/testing");
var fake_backend_1 = require("./helpers/fake-backend");
var no_authed_guard_component_1 = require("./share/guard/no-authed-guard.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                ng_bootstrap_1.NgbModule.forRoot(),
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                ng2_charts_1.ChartsModule,
                share_module_1.ShareModule
            ],
            declarations: [
                app_component_1.AppComponent,
                sidebar_component_1.SidebarComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                product_list_component_1.ProductListComponent,
                product_edit_component_1.ProductEditComponent
            ],
            providers: [
                auth_guard_component_1.AuthGuard,
                authentication_service_1.AuthenticationService,
                no_authed_guard_component_1.NoAuthedGuard,
                upload_service_1.UploadService,
                product_service_1.ProductService,
                fake_backend_1.FakeBackendProvider,
                testing_1.MockBackend,
                http_1.BaseRequestOptions
            ],
            entryComponents: [alert_component_1.AlertComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map