"use strict";
/**
 * Created by Linweiwei on 2017/1/13.
 */
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
    return UploadService;
}());
UploadService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
UploadService.ctorParameters = function () { return [
    { type: http_1.Http, },
    { type: authentication_service_1.AuthenticationService, },
]; };
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map