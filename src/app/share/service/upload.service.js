"use strict";
/**
 * Created by Linweiwei on 2017/1/13.
 */
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
var http_1 = require("@angular/http");
var authentication_service_1 = require("./authentication.service");
var UploadService = (function () {
    function UploadService(http, authenticationServie) {
        this.http = http;
        this.authenticationServie = authenticationServie;
    }
    UploadService.prototype.uploadSingleFile = function (file) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Authorization", this.authenticationServie.getAuthorizationToken());
        var formData = new FormData();
        formData.append('file', file, file.name);
        return new Promise(function (resolve, reject) {
            _this.http.post("api/fileupload", formData, {
                headers: headers
            }).subscribe(function (res) {
                resolve(res.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    UploadService.prototype.uploadFile = function (url, file) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Authorization", this.authenticationServie.getAuthorizationToken());
        var formData = new FormData();
        formData.append('file', file, file.name);
        return new Promise(function (resolve, reject) {
            _this.http.post(url, formData, {
                headers: headers
            }).subscribe(function (res) {
                resolve(res.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    return UploadService;
}());
UploadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        authentication_service_1.AuthenticationService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map