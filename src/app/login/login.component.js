"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../share/service/authentication.service");
var forms_1 = require("@angular/forms");
/**
 * Created by yitala on 2017/1/15.
 */
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService, fb) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.error = '';
        this.loading = false;
        this.loginForm = this.fb.group({
            'username': ['', forms_1.Validators.required],
            'password': ['', forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.submitForm = function (form) {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(form["username"], form["password"])
            .subscribe(function (result) {
            console.log(result);
            if (result == true) {
                _this.router.navigate(["/dashboard"]);
            }
            else {
                _this.error = "账号或者密码错误";
                _this.loading = false;
            }
        }, function (error) {
            _this.error = "账号或者密码错误";
            _this.loading = false;
        });
    };
    return LoginComponent;
}());
LoginComponent.decorators = [
    { type: core_1.Component, args: [{
                templateUrl: 'login.component.html'
            },] },
];
/** @nocollapse */
LoginComponent.ctorParameters = function () { return [
    { type: router_1.Router, },
    { type: authentication_service_1.AuthenticationService, },
    { type: forms_1.FormBuilder, },
]; };
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map