/**
 * Created by Linweiwei on 2017/1/13.
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
    ProductService.prototype.setHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", 'application/json');
        headers.append("Authorization", this.authenticationServie.getAuthorizationToken());
        return headers;
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map