"use strict";
/**
 * Created by Linweiwei on 2017/1/12.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_service_1 = require("../../share/service/product.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var state_service_1 = require("../../share/service/state.service");
var angular2_notifications_1 = require("angular2-notifications");
var js_base64_1 = require("js-base64");
var ProductListComponent = (function () {
    function ProductListComponent(productService, fb, router, activatedRoute, stateService, notificationService) {
        this.productService = productService;
        this.fb = fb;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.stateService = stateService;
        this.notificationService = notificationService;
        this.products = [];
        this.page = 1;
        this.size = 12;
        this.confirmStatus = false;
        this.refreshLoading = false;
        this.options = {
            position: ["top", "right"],
            timeOut: 3000,
            lastOnBottom: true
        };
        this.searchForm = fb.group({
            'category': ['all'],
            'status': ['all'],
            'name': ['']
        });
        this.showType = this.stateService.productListShowType;
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
        this.refreshLoading = true;
        this.productService.getJson(url)
            .then(function (response) {
            _this.refreshLoading = false;
            var databack = JSON.parse(response["_body"]);
            for (var _i = 0, _a = databack.content; _i < _a.length; _i++) {
                var item = _a[_i];
                item.images = item.images.substring(0, item.images.indexOf(','));
            }
            _this.products = databack.content;
            _this.totalElements = databack.totalElements;
        })
            .catch(function (error) {
            _this.refreshLoading = false;
            console.log(error);
            _this.notificationService.error('错误', "系统错误，请联系管理员");
        });
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
                _this.notificationService.error('错误', responseBody.message);
            }
        })
            .catch(function (error) {
            _this.confirmStatus = false;
            console.log(error);
            _this.notificationService.error('错误', "系统错误，请联系管理员");
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
        var _this = this;
        //因为本级是第二级的导航，所以要获取上级的url path
        var parentPath = this.activatedRoute.parent.routeConfig.path;
        //******************* !!! 这里特别注意，先查询下个页面的富文本内容，不然富文本有时候初始化不了 **********************//
        this.refreshLoading = true;
        this.productService.getJson("api/productDesc/" + product.productId)
            .then(function (response) {
            _this.refreshLoading = false;
            if (response.status == 204) {
                _this.stateService.productDesc.description = "商品信息";
            }
            else {
                var desc = JSON.parse(response["_body"]);
                _this.stateService.productDesc = desc;
                _this.stateService.productDesc.description = js_base64_1.Base64.decode(desc.description);
            }
            //查询完毕，跳转页面
            _this.router.navigate([parentPath + "/description", { id: product.productId }]);
        })
            .catch(function (error) {
            _this.notificationService.error('错误', "系统错误，请联系管理员");
        });
    };
    ProductListComponent.prototype.view = function (product) {
        var parentPath = this.activatedRoute.parent.routeConfig.path;
        this.router.navigate([parentPath + "/detail", { id: product.productId }]);
    };
    ProductListComponent.prototype.toggleShowType = function (type) {
        this.showType = this.stateService.productListShowType = type;
    };
    return ProductListComponent;
}());
ProductListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'product-list',
                templateUrl: 'product-list.component.html',
                styleUrls: ['product-list.component.css']
            },] },
];
/** @nocollapse */
ProductListComponent.ctorParameters = function () { return [
    { type: product_service_1.ProductService, },
    { type: forms_1.FormBuilder, },
    { type: router_1.Router, },
    { type: router_1.ActivatedRoute, },
    { type: state_service_1.StateService, },
    { type: angular2_notifications_1.NotificationsService, },
]; };
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map