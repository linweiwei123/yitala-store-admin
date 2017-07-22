"use strict";
/**
 * Created by yitala on 2017/1/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var user_model_1 = require("../models/user.model");
var http_1 = require("@angular/http");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.currentUserSubject = new rxjs_1.BehaviorSubject(new user_model_1.User());
        this.currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
        this.isAuthenticatedSubject = new rxjs_1.ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
    }
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
    AuthenticationService.prototype.checkIsAuthenticated = function () {
        var currentUser = window.localStorage.getItem('currentUser');
        if (currentUser) {
            this.setAuth(JSON.parse(currentUser));
        }
        else {
            this.cleanAuth();
        }
    };
    AuthenticationService.prototype.setAuth = function (user) {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        window.localStorage.setItem('currentUser', JSON.stringify(user));
    };
    AuthenticationService.prototype.cleanAuth = function () {
        this.currentUserSubject.next(new user_model_1.User());
        this.isAuthenticatedSubject.next(false);
        window.localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.getAuthorizationToken = function () {
        var currentUser = window.localStorage.getItem('currentUser');
        var user = JSON.parse(currentUser);
        return user.token;
    };
    return AuthenticationService;
}());
AuthenticationService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
AuthenticationService.ctorParameters = function () { return [
    { type: http_1.Http, },
]; };
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map