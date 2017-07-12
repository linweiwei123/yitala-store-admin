"use strict";
/**
 * Created by Linweiwei on 2017/1/12.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_service_1 = require("../../share/service/product.service");
var alert_component_1 = require("../../share/alert/alert.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var global_loading_component_1 = require("../../share/loading/global-loading.component");
var state_service_1 = require("../../share/service/state.service");
var ProductListComponent = (function (_super) {
    __extends(ProductListComponent, _super);
    function ProductListComponent(productService, modalService, fb, router, activatedRoute, stateService) {
        var _this = _super.call(this) || this;
        _this.productService = productService;
        _this.modalService = modalService;
        _this.fb = fb;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.stateService = stateService;
        _this.products = [];
        _this.page = 1;
        _this.size = 12;
        _this.confirmStatus = false;
        _this.searchForm = fb.group({
            'category': ['all'],
            'status': ['all'],
            'name': ['']
        });
        _this.showType = _this.stateService.productListShowType;
        return _this;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.getProducts({ "type": "all", "status": "all" });
    };
    ProductListComponent.prototype.getProducts = function (param) {
        var _this = this;
        var url = "api/product/page?page=" + (this.page - 1) + "&size=" + this.size;
        if (param) {
            if (param["type"]) {
                url += "&type=" + param["type"];
            }
            if (param["name"]) {
                url += "&name=" + param["name"];
            }
            if (param["status"]) {
                url += "&status=" + param["status"];
            }
        }
        else {
            url += "&type=all&status=all";
        }
        this.showLoading();
        this.productService.getJson(url)
            .then(function (response) {
            _this.cancelLoading();
            var databack = JSON.parse(response["_body"]);
            for (var _i = 0, _a = databack.content; _i < _a.length; _i++) {
                var item = _a[_i];
                item.images = item.images.substring(0, item.images.indexOf(','));
            }
            _this.products = databack.content;
            _this.totalElements = databack.totalElements;
        })
            .catch(function (error) {
            _this.cancelLoading();
            console.log(error);
            _this.openModel("系统错误，请联系管理员");
        });
    };
    ProductListComponent.prototype.openModel = function (msg) {
        var modalRef = this.modalService.open(alert_component_1.AlertComponent, { backdrop: "static", keyboard: false, size: "sm" });
        modalRef.componentInstance.msg = "" + msg;
    };
    ProductListComponent.prototype.delete = function (product) {
        this.confirmStatus = true;
        this.toDeleteProduct = product;
    };
    ProductListComponent.prototype.confirm = function () {
        var _this = this;
        this.productService.deleteJson("api/product/" + this.toDeleteProduct.productId)
            .then(function (res) {
            _this.confirmStatus = false;
            if (res["_body"] == "success") {
                //this.openModel("删除成功");
                _this.getProducts({ "type": "all", "status": "all" });
            }
            else {
                var responseBody = JSON.parse(res["_body"]);
                _this.openModel(responseBody.message);
            }
        })
            .catch(function (error) {
            _this.confirmStatus = false;
            console.log(error);
            _this.openModel("系统错误，请联系管理员");
        });
    };
    ProductListComponent.prototype.cancel = function () {
        this.confirmStatus = false;
    };
    ProductListComponent.prototype.onSubmit = function (form) {
        var param = { "type": form.category, "status": form.status };
        if (form.name != "") {
            param["name"] = form.name;
        }
        this.getProducts(param);
    };
    ProductListComponent.prototype.edit = function (product) {
        //因为本级是第二级的导航，所以要获取上级的url path
        var parentPath = this.activatedRoute.parent.routeConfig.path;
        this.router.navigate([parentPath + "/update", { id: product.productId }]);
    };
    ProductListComponent.prototype.editDesc = function (product) {
        //因为本级是第二级的导航，所以要获取上级的url path
        var parentPath = this.activatedRoute.parent.routeConfig.path;
        this.router.navigate([parentPath + "/description", { id: product.productId }]);
    };
    ProductListComponent.prototype.view = function (product) {
        var parentPath = this.activatedRoute.parent.routeConfig.path;
        this.router.navigate([parentPath + "/detail", { id: product.productId }]);
    };
    ProductListComponent.prototype.toggleShowType = function (type) {
        this.showType = this.stateService.productListShowType = type;
    };
    return ProductListComponent;
}(global_loading_component_1.GlobalLoadingComponent));
ProductListComponent = __decorate([
    core_1.Component({
        selector: 'product-list',
        templateUrl: 'product-list.component.html',
        styleUrls: ['product-list.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        ng_bootstrap_1.NgbModal,
        forms_1.FormBuilder,
        router_1.Router,
        router_1.ActivatedRoute,
        state_service_1.StateService])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map