"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Linweiwei on 2017/1/12.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var upload_service_1 = require("../share/service/upload.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var alert_component_1 = require("../share/alert/alert.component");
var forms_1 = require("@angular/forms");
var product_service_1 = require("../share/service/product.service");
var global_loading_component_1 = require("../share/loading/global-loading.component");
var ProductEditComponent = (function (_super) {
    __extends(ProductEditComponent, _super);
    function ProductEditComponent(http, uploadService, modalService, fb, productService) {
        _super.call(this);
        this.http = http;
        this.uploadService = uploadService;
        this.modalService = modalService;
        this.fb = fb;
        this.productService = productService;
        this.productImages = [];
        this.http = http;
        this.productForm = fb.group({
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
    }
    ProductEditComponent.prototype.fileChange = function (event) {
        var _this = this;
        var files = event.target.files;
        this.uploadService.uploadSingleFile(files[0])
            .then(function (result) {
            console.log(result);
            if (result.errorCode) {
                _this.openModel(result.message);
            }
            else {
                _this.productImages.push(result);
                console.log(_this.productImages);
            }
        })
            .catch(function (error) {
            _this.openModel("系统故障，请联系管理员");
        });
    };
    ProductEditComponent.prototype.onSubmit = function (form) {
        var _this = this;
        form["images"] = this.productImages;
        this.showLoading();
        this.productService.postJson("api/product", form)
            .then(function (res) {
            _this.cancelLoading();
            if (res["_body"] == "success") {
                _this.openModel("保存成功");
                //清空内容并重新初始化
                _this.productForm = _this.fb.group({
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
                _this.productImages = [];
                _this.fileInput.nativeElement.value = "";
            }
            else {
                var responseBody = JSON.parse(res["_body"]);
                _this.openModel(responseBody.message);
            }
        });
    };
    ProductEditComponent.prototype.openModel = function (msg) {
        var modalRef = this.modalService.open(alert_component_1.AlertComponent, { backdrop: "static", keyboard: false, size: "sm" });
        modalRef.componentInstance.msg = "" + msg;
    };
    __decorate([
        core_1.ViewChild('fileInput'), 
        __metadata('design:type', Object)
    ], ProductEditComponent.prototype, "fileInput", void 0);
    ProductEditComponent = __decorate([
        core_1.Component({
            selector: 'product-edit',
            templateUrl: 'product-edit.component.html',
            styleUrls: ['product-edit.component.css']
        }), 
        __metadata('design:paramtypes', [http_1.Http, upload_service_1.UploadService, ng_bootstrap_1.NgbModal, forms_1.FormBuilder, product_service_1.ProductService])
    ], ProductEditComponent);
    return ProductEditComponent;
}(global_loading_component_1.GlobalLoadingComponent));
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map