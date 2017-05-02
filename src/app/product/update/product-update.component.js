"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Linweiwei on 2017/1/12.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var upload_service_1 = require("../../share/service/upload.service");
var ProductImage_1 = require("../../productedit/ProductImage");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var alert_component_1 = require("../../share/alert/alert.component");
var forms_1 = require("@angular/forms");
var product_service_1 = require("../../share/service/product.service");
var router_1 = require("@angular/router");
var global_loading_component_1 = require("../../share/loading/global-loading.component");
var ProductUpdateComponent = (function (_super) {
    __extends(ProductUpdateComponent, _super);
    function ProductUpdateComponent(http, uploadService, modalService, fb, productService, activedRoute, router) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.uploadService = uploadService;
        _this.modalService = modalService;
        _this.fb = fb;
        _this.productService = productService;
        _this.activedRoute = activedRoute;
        _this.router = router;
        _this.productImages = [];
        _this.category = "all";
        _this.updateLoading = false;
        _this.uploadLoading = false;
        _this.http = http;
        _this.productForm = fb.group({
            'name': ['', forms_1.Validators.required],
            'brand': ['', forms_1.Validators.required],
            'type': ['watch', forms_1.Validators.required],
            'price': ['', forms_1.Validators.required],
            'discount': [''],
            'status': ['inline', forms_1.Validators.required],
            'description': ['', forms_1.Validators.required],
            'color': [''],
            'size': [''],
            'images': ['']
        });
        activedRoute.params.subscribe(function (params) {
            _this.productId = params["id"];
        });
        return _this;
    }
    ProductUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.productId) {
            //查询loading
            this.updateLoading = true;
            this.productService.getJson("api/product/" + this.productId)
                .then(function (response) {
                _this.updateLoading = false;
                var data = JSON.parse(response["_body"]);
                for (var item in data) {
                    if (_this.productForm.controls[item]) {
                        _this.productForm.controls[item].setValue(data[item]);
                    }
                }
                var imageUrlsStr = data.images;
                var imageUrlArr = imageUrlsStr.split(",");
                for (var i = 0; i < imageUrlArr.length - 1; i++) {
                    var productImage = new ProductImage_1.ProductImage();
                    productImage.fileUrl = imageUrlArr[i];
                    _this.productImages.push(productImage);
                }
            })
                .catch(function (error) {
                _this.updateLoading = false;
                console.log(error);
                _this.openModel("系统错误，请联系管理员");
            });
        }
    };
    ProductUpdateComponent.prototype.fileChange = function (event) {
        var _this = this;
        var files = event.target.files;
        if (files[0].size >= 1048576) {
            this.openModel("图片最大不能超过1M");
            return;
        }
        this.uploadLoading = true;
        this.uploadService.uploadSingleFile(files[0])
            .then(function (result) {
            _this.uploadLoading = false;
            if (result.errorCode) {
                _this.openModel(result.message);
            }
            else {
                _this.productImages.push(result);
                console.log(_this.productImages);
            }
        })
            .catch(function (error) {
            _this.uploadLoading = false;
            _this.openModel("系统故障，请联系管理员");
        });
    };
    ProductUpdateComponent.prototype.onSubmit = function (form) {
        var _this = this;
        form["images"] = this.productImages;
        if (this.productId) {
            form["productId"] = this.productId;
        }
        this.showLoading();
        this.productService.postJson("api/product", form)
            .then(function (res) {
            _this.cancelLoading();
            if (res["_body"] == "success") {
                _this.openModel("保存成功");
                _this.backToList();
            }
            else {
                var responseBody = JSON.parse(res["_body"]);
                _this.openModel(responseBody.message);
            }
        });
    };
    ProductUpdateComponent.prototype.openModel = function (msg) {
        var modalRef = this.modalService.open(alert_component_1.AlertComponent, { backdrop: "static", keyboard: false, size: "sm" });
        modalRef.componentInstance.msg = "" + msg;
    };
    ProductUpdateComponent.prototype.backToList = function () {
        this.router.navigate(['/productList']);
    };
    return ProductUpdateComponent;
}(global_loading_component_1.GlobalLoadingComponent));
ProductUpdateComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'product-update',
                templateUrl: 'product-update.component.html',
                styleUrls: ['product-update.component.css']
            },] },
];
/** @nocollapse */
ProductUpdateComponent.ctorParameters = function () { return [
    { type: http_1.Http, },
    { type: upload_service_1.UploadService, },
    { type: ng_bootstrap_1.NgbModal, },
    { type: forms_1.FormBuilder, },
    { type: product_service_1.ProductService, },
    { type: router_1.ActivatedRoute, },
    { type: router_1.Router, },
]; };
ProductUpdateComponent.propDecorators = {
    'fileInput': [{ type: core_1.ViewChild, args: ['fileInput',] },],
};
exports.ProductUpdateComponent = ProductUpdateComponent;
//# sourceMappingURL=product-update.component.js.map