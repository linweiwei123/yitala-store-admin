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
var upload_service_1 = require("../../share/service/upload.service");
var ProductImage_1 = require("../../productedit/ProductImage");
var forms_1 = require("@angular/forms");
var product_service_1 = require("../../share/service/product.service");
var router_1 = require("@angular/router");
var global_loading_component_1 = require("../../share/loading/global-loading.component");
var angular2_notifications_1 = require("angular2-notifications");
var ProductUpdateComponent = (function (_super) {
    __extends(ProductUpdateComponent, _super);
    function ProductUpdateComponent(http, uploadService, fb, productService, activedRoute, router, notificationService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.uploadService = uploadService;
        _this.fb = fb;
        _this.productService = productService;
        _this.activedRoute = activedRoute;
        _this.router = router;
        _this.notificationService = notificationService;
        _this.productImages = [];
        _this.updateLoading = false;
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
                _this.notificationService.error('错误', "系统错误，请联系管理员");
            });
        }
    };
    ProductUpdateComponent.prototype.fileChange = function (event) {
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
            }
        })
            .catch(function (error) {
            _this.uploadLoading = false;
            _this.notificationService.error('错误', "系统故障，请联系管理员");
        });
    };
    ProductUpdateComponent.prototype.onSubmit = function (form) {
        var _this = this;
        form["images"] = this.productImages;
        if (this.productId) {
            form["productId"] = this.productId;
        }
        this.updateLoading = true;
        this.productService.postJson("api/product", form)
            .then(function (res) {
            _this.updateLoading = false;
            if (res["_body"] == "success") {
                _this.notificationService.success('成功', "保存成功");
                _this.backToList();
            }
            else {
                var responseBody = JSON.parse(res["_body"]);
                _this.notificationService.error('错误', responseBody.message);
            }
        });
    };
    ProductUpdateComponent.prototype.backToList = function () {
        this.router.navigate(['/productList']);
    };
    return ProductUpdateComponent;
}(global_loading_component_1.GlobalLoadingComponent));
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", Object)
], ProductUpdateComponent.prototype, "fileInput", void 0);
ProductUpdateComponent = __decorate([
    core_1.Component({
        selector: 'product-update',
        templateUrl: 'product-update.component.html',
        styleUrls: ['product-update.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http,
        upload_service_1.UploadService,
        forms_1.FormBuilder,
        product_service_1.ProductService,
        router_1.ActivatedRoute,
        router_1.Router,
        angular2_notifications_1.NotificationsService])
], ProductUpdateComponent);
exports.ProductUpdateComponent = ProductUpdateComponent;
//# sourceMappingURL=product-update.component.js.map