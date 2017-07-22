"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2016/11/25.
 */
var core_1 = require("@angular/core");
var authentication_service_1 = require("./share/service/authentication.service");
var AppComponent = (function () {
    function AppComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.title = '英雄帖';
        this.isSignOn = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //首次初始化未登录
        this.authenticationService.checkIsAuthenticated();
        this.authenticationService.isAuthenticated.subscribe(function (isAuthenticated) {
            if (isAuthenticated) {
                _this.isSignOn = true;
            }
            else
                _this.isSignOn = false;
        });
        $(".container-fluid").css("min-height", $(window).height() - 120);
    };
    //解决footer无法一直在底部的问题
    AppComponent.prototype.onResize = function (event) {
        $(".container-fluid").css("min-height", $(window).height() - 120);
    };
    return AppComponent;
}());
AppComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'my-app',
                templateUrl: 'app.component.html',
                styleUrls: ['app.component.css'],
                host: {
                    '(window:resize)': 'onResize($event)'
                }
            },] },
];
/** @nocollapse */
AppComponent.ctorParameters = function () { return [
    { type: authentication_service_1.AuthenticationService, },
]; };
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map