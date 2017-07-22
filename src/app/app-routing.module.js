"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var product_edit_component_1 = require("./productedit/product-edit.component");
var auth_guard_component_1 = require("./share/guard/auth-guard.component");
var login_component_1 = require("./login/login.component");
var no_authed_guard_component_1 = require("./share/guard/no-authed-guard.component");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent, canActivate: [no_authed_guard_component_1.NoAuthedGuard] },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, data: { name: '仪表盘' }, canActivate: [auth_guard_component_1.AuthGuard] },
    { path: 'productList', loadChildren: './product/product.module#ProductModule' },
    { path: 'productEdit', component: product_edit_component_1.ProductEditComponent, data: { name: '商品发布' }, canActivate: [auth_guard_component_1.AuthGuard] },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [router_1.RouterModule.forRoot(appRoutes, { useHash: true })],
                exports: [router_1.RouterModule]
            },] },
];
/** @nocollapse */
AppRoutingModule.ctorParameters = function () { return []; };
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map