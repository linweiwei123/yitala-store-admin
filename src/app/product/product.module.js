"use strict";
/**
 * Created by yitala on 2017/2/19.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var description_component_1 = require("./desription/description.component");
var ng2_ckeditor_1 = require("ng2-ckeditor");
var ng2_alt_summernote_1 = require("ng2-alt-summernote");
var angular2_notifications_1 = require("angular2-notifications");
var productRoutes = [
    {
        path: 'update',
        component: product_update_component_1.ProductUpdateComponent,
        data: { name: '商品修改' },
        canActivate: [auth_guard_component_1.AuthGuard]
    },
    {
        path: 'description',
        component: description_component_1.DescriptionComponent,
        data: { name: '商品信息编辑' },
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
ProductModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            http_1.HttpModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            share_module_1.ShareModule,
            router_1.RouterModule.forChild(productRoutes),
            ng2_ckeditor_1.CKEditorModule,
            ng2_alt_summernote_1.SummernoteModule,
            angular2_notifications_1.SimpleNotificationsModule.forRoot()
        ],
        declarations: [
            product_list_component_1.ProductListComponent,
            product_update_component_1.ProductUpdateComponent,
            product_detail_component_1.ProductDetailComponent,
            description_component_1.DescriptionComponent
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map