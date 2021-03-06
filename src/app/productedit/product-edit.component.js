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
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", Object)
], ProductEditComponent.prototype, "fileInput", void 0);
ProductEditComponent = __decorate([
    core_1.Component({
        selector: 'product-edit',
        templateUrl: 'product-edit.component.html',
        styleUrls: ['product-edit.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http,
        upload_service_1.UploadService,
        forms_1.FormBuilder,
        product_service_1.ProductService,
        angular2_notifications_1.NotificationsService])
], ProductEditComponent);
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map