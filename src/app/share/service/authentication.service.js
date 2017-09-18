"use strict";
/**
 * Created by yitala on 2017/1/15.
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
var rxjs_1 = require("rxjs");
var user_model_1 = require("../models/user.model");
var http_1 = require("@angular/http");
var jwt_service_1 = require("./jwt.service");
var product_service_1 = require("./product.service");
var AuthenticationService = (function () {
    function AuthenticationService(http, productService, jwtService) {
        this.http = http;
        this.productService = productService;
        this.jwtService = jwtService;
        this.currentUserSubject = new rxjs_1.BehaviorSubject(new user_model_1.User());
        this.currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
        this.isAuthenticatedSubject = new rxjs_1.ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
    }
    //app启动时检查token是否有效，有效则获取用户，无效则删除用户信息
    AuthenticationService.prototype.autoLogin = function () {
        var _this = this;
        console.log(this.jwtService.getToken());
        if (this.jwtService.getToken()) {
            this.productService.get("api/user")
                .subscribe(function (data) {
                console.log("get user:", data);
                var user = new user_model_1.User();
                user.username = data.username;
                user.token = _this.jwtService.getToken();
                _this.setAuth(user);
            }, function (error) {
                console.log("get user error:", error);
                _this.cleanAuth();
            });
        }
        else {
            this.cleanAuth();
        }
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var param = { username: username, password: password };
        return this.http.post('api/authenticate', param)
            .map(function (response) {
            //如果有token返回，则认证成功
            console.log(response);
            var responseBody = response["_body"];
            var token = JSON.parse(responseBody).token;
            if (token) {
                var user = new user_model_1.User;
                user.token = token;
                _this.setAuth(user);
                return true;
            }
            else {
                _this.cleanAuth();
                return false;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        this.cleanAuth();
    };
    AuthenticationService.prototype.setAuth = function (user) {
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    };
    AuthenticationService.prototype.cleanAuth = function () {
        this.jwtService.destoryToken();
        this.currentUserSubject.next(new user_model_1.User());
        this.isAuthenticatedSubject.next(false);
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        product_service_1.ProductService,
        jwt_service_1.JwtService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map