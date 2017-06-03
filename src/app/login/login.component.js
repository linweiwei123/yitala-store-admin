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
LoginComponent = __decorate([
    core_1.Component({
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthenticationService,
        forms_1.FormBuilder])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map