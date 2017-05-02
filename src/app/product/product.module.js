"use strict";
/**
 * Created by yitala on 2017/2/19.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_list_component_1 = require("./list/product-list.component");
var auth_guard_component_1 = require("../share/guard/auth-guard.component");
var product_update_component_1 = require("./update/product-update.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var share_module_1 = require("../share/share.module");
var product_detail_component_1 = require("./detail/product-detail.component");
var productRoutes = [
    {
        path: 'update',
        component: product_update_component_1.ProductUpdateComponent,
        data: { name: '商品修改' },
        canActivate: [auth_guard_component_1.AuthGuard]
    },
    {
        path: 'detail',
        component: product_detail_component_1.ProductDetailComponent,
        data: { name: '商品详情' },
        canActivate: [auth_guard_component_1.AuthGuard]
    },
    {
        path: '',
        component: product_list_component_1.ProductListComponent,
        data: { name: '商品列表' },
        canActivate: [auth_guard_component_1.AuthGuard]
    }
];
var ProductModule = (function () {
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    ng_bootstrap_1.NgbModule.forRoot(),
                    http_1.HttpModule,
                    forms_1.FormsModule,
                    forms_1.ReactiveFormsModule,
                    share_module_1.ShareModule,
                    router_1.RouterModule.forChild(productRoutes)
                ],
                declarations: [
                    product_list_component_1.ProductListComponent,
                    product_update_component_1.ProductUpdateComponent,
                    product_detail_component_1.ProductDetailComponent
                ],
                schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            },] },
];
/** @nocollapse */
ProductModule.ctorParameters = function () { return []; };
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map