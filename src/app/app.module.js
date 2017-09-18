"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
require("./rxjs-extensions");
require("../assets/css/styles.css");
var share_module_1 = require("./share/share.module");
var app_routing_module_1 = require("./app-routing.module");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var sidebar_component_1 = require("./share/layout/sidebar/sidebar.component");
var product_edit_component_1 = require("./productedit/product-edit.component");
var upload_service_1 = require("./share/service/upload.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var alert_component_1 = require("./share/alert/alert.component");
var forms_1 = require("@angular/forms");
var product_service_1 = require("./share/service/product.service");
var auth_guard_component_1 = require("./share/guard/auth-guard.component");
var authentication_service_1 = require("./share/service/authentication.service");
var login_component_1 = require("./login/login.component");
var no_authed_guard_component_1 = require("./share/guard/no-authed-guard.component");
var product_module_1 = require("./product/product.module");
var angular2_highcharts_1 = require("angular2-highcharts");
var HighchartsService_1 = require("angular2-highcharts/dist/HighchartsService");
var state_service_1 = require("./share/service/state.service");
var angular2_notifications_1 = require("angular2-notifications");
var animations_1 = require("@angular/platform-browser/animations");
var order_service_1 = require("./share/service/order.service");
var order_module_1 = require("./order/order.module");
var blog_module_1 = require("./blog/blog.module");
var jwt_service_1 = require("./share/service/jwt.service");
function highchartsFactory() {
    return require('highcharts');
}
exports.highchartsFactory = highchartsFactory;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            ng_bootstrap_1.NgbModule.forRoot(),
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            app_routing_module_1.AppRoutingModule,
            share_module_1.ShareModule,
            angular2_highcharts_1.ChartModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            blog_module_1.BlogModule,
            angular2_notifications_1.SimpleNotificationsModule.forRoot(),
            animations_1.BrowserAnimationsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            sidebar_component_1.SidebarComponent,
            login_component_1.LoginComponent,
            dashboard_component_1.DashboardComponent,
            product_edit_component_1.ProductEditComponent
        ],
        providers: [
            auth_guard_component_1.AuthGuard,
            authentication_service_1.AuthenticationService,
            no_authed_guard_component_1.NoAuthedGuard,
            upload_service_1.UploadService,
            product_service_1.ProductService,
            jwt_service_1.JwtService,
            {
                provide: HighchartsService_1.HighchartsStatic,
                useFactory: highchartsFactory
            },
            state_service_1.StateService,
            order_service_1.OrderService
        ],
        entryComponents: [alert_component_1.AlertComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map