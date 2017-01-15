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
/**
 * Created by Administrator on 2016/11/25.
 */
var core_1 = require('@angular/core');
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
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            host: {
                '(window:resize)': 'onResize($event)'
            }
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map