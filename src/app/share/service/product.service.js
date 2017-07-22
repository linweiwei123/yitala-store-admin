"use strict";
/**
 * Created by Linweiwei on 2017/1/13.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var authentication_service_1 = require("./authentication.service");
var ProductService = (function () {
    function ProductService(http, authenticationServie) {
        this.http = http;
        this.authenticationServie = authenticationServie;
    }
    ProductService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ProductService.prototype.postJson = function (url, params) {
        var options = {};
        options.headers = this.setHeaders();
        return this.http.post(url, params, options)
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    ProductService.prototype.getJson = function (url, params) {
        var options = {};
        options.headers = this.setHeaders();
        options.body = params;
        return this.http.get(url, options)
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    ProductService.prototype.deleteJson = function (url, params) {
        var options = {};
        options.headers = this.setHeaders();
        options.body = params;
        return this.http.delete(url, options)
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    ProductService.prototype.postForm = function (url, params) {
        console.log(params);
        var options = {};
        options.headers = this.setFormDataHeaders();
        options.params = params;
        return this.http.post(url, params, options)
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    ProductService.prototype.setHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", 'application/json');
        headers.append("Authorization", this.authenticationServie.getAuthorizationToken());
        return headers;
    };
    ProductService.prototype.setFormDataHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", 'application/x-www-form-urlencoded');
        headers.append("Authorization", this.authenticationServie.getAuthorizationToken());
        return headers;
    };
    return ProductService;
}());
ProductService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ProductService.ctorParameters = function () { return [
    { type: http_1.Http, },
    { type: authentication_service_1.AuthenticationService, },
]; };
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map