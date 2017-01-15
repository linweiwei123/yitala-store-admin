/**
 * Created by Linweiwei on 2017/1/12.
 */
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
var core_1 = require("@angular/core");
var product_service_1 = require("../share/service/product.service");
var alert_component_1 = require("../share/alert/alert.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ProductListComponent = (function () {
    function ProductListComponent(productService, modalService) {
        this.productService = productService;
        this.modalService = modalService;
        this.products = [];
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.getProducts();
    };
    ProductListComponent.prototype.getProducts = function () {
        var _this = this;
        this.productService.getJson("api/product")
            .then(function (response) {
            console.log(response._body);
            var databack = JSON.parse(response._body);
            for (var _i = 0, databack_1 = databack; _i < databack_1.length; _i++) {
                var item = databack_1[_i];
                item.images = item.images.substring(0, item.images.indexOf(','));
            }
            _this.products = databack;
        })
            .catch(function (error) {
            console.log(error);
            _this.openModel("系统错误，请联系管理员");
        });
    };
    ProductListComponent.prototype.openModel = function (msg) {
        var modalRef = this.modalService.open(alert_component_1.AlertComponent, { backdrop: "static", keyboard: false, size: "sm" });
        modalRef.componentInstance.msg = "" + msg;
    };
    ProductListComponent = __decorate([
        core_1.Component({
            selector: 'product-list',
            templateUrl: 'product-list.component.html',
            styleUrls: ['product-list.component.css']
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, ng_bootstrap_1.NgbModal])
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map