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
var upload_service_1 = require("../share/service/upload.service");
var forms_1 = require("@angular/forms");
var product_service_1 = require("../share/service/product.service");
var global_loading_component_1 = require("../share/loading/global-loading.component");
var angular2_notifications_1 = require("angular2-notifications");
var ProductEditComponent = (function (_super) {
    __extends(ProductEditComponent, _super);
    function ProductEditComponent(http, uploadService, fb, productService, notificationService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.uploadService = uploadService;
        _this.fb = fb;
        _this.productService = productService;
        _this.notificationService = notificationService;
        _this.productImages = [];
        _this.loading = false;
        _this.uploadLoading = false;
        _this.options = {
            position: ["top", "right"],
            timeOut: 3000,
            lastOnBottom: true
        };
        _this.http = http;
        _this.productForm = fb.group({
            'name': ['', forms_1.Validators.required],
            'brand': ['', forms_1.Validators.required],
            'type': ['watch', forms_1.Validators.required],
            'price': ['', forms_1.Validators.required],
            'discount': [''],
            'status': ['inline', forms_1.Validators.required],
            'recommended': [false],
            'description': ['', forms_1.Validators.required],
            'color': [''],
            'size': [''],
            'images': ['']
        });
        return _this;
    }
    ProductEditComponent.prototype.fileChange = function (event) {
        var _this = this;
        var files = event.target.files;
        if (files[0].size >= 1048576) {
            this.notificationService.warn('提示', "图片最大不能超过1M");
            this.fileInput.nativeElement.value = "";
            return;
        }
        this.uploadLoading = true;
        this.uploadService.uploadSingleFile(files[0])
            .then(function (result) {
            _this.uploadLoading = false;
            _this.fileInput.nativeElement.value = "";
            if (result.errorCode) {
                _this.notificationService.error('错误', result.message);
            }
            else {
                _this.productImages.push(result);
                console.log(_this.productImages);
            }
        })
            .catch(function (error) {
            _this.uploadLoading = false;
            _this.notificationService.error('错误', "系统故障，请联系管理员");
        });
    };
    ProductEditComponent.prototype.onSubmit = function (form) {
        var _this = this;
        form["images"] = this.productImages;
        this.loading = true;
        this.productService.postJson("api/product", form)
            .then(function (res) {
            _this.loading = false;
            if (res["_body"] == "success") {
                _this.notificationService.success('成功', "保存成功");
                //清空内容并重新初始化
                _this.productForm = _this.fb.group({
                    'name': ['', forms_1.Validators.required],
                    'brand': ['', forms_1.Validators.required],
                    'type': ['watch', forms_1.Validators.required],
                    'price': ['', forms_1.Validators.required],
                    'discount': [''],
                    'status': ['inline', forms_1.Validators.required],
                    'recommended': [false],
                    'description': ['', forms_1.Validators.required],
                    'color': [''],
                    'size': [''],
                    'images': ['']
                });
                _this.productImages = [];
                _this.fileInput.nativeElement.value = "";
            }
            else {
                var responseBody = JSON.parse(res["_body"]);
                _this.notificationService.error('错误', responseBody.message);
            }
        });
    };
    ProductEditComponent.prototype.removeImage = function (img) {
        this.productImages = this.productImages.filter(function (item) {
            return item != img;
        });
    };
    return ProductEditComponent;
}(global_loading_component_1.GlobalLoadingComponent));
ProductEditComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'product-edit',
                templateUrl: 'product-edit.component.html',
                styleUrls: ['product-edit.component.css']
            },] },
];
/** @nocollapse */
ProductEditComponent.ctorParameters = function () { return [
    { type: http_1.Http, },
    { type: upload_service_1.UploadService, },
    { type: forms_1.FormBuilder, },
    { type: product_service_1.ProductService, },
    { type: angular2_notifications_1.NotificationsService, },
]; };
ProductEditComponent.propDecorators = {
    'fileInput': [{ type: core_1.ViewChild, args: ['fileInput',] },],
};
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map