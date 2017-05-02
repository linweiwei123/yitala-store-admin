"use strict";
/**
 * Created by yitala on 2017/1/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../service/authentication.service");
var AuthGuard = (function () {
    function AuthGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        console.log(111);
        this.authenticationService.isAuthenticated.subscribe(function (isAuthenticated) {
            console.log(isAuthenticated);
            if (!isAuthenticated) {
                _this.router.navigate(['/login']);
            }
            else {
                _this.isAuthenticated = isAuthenticated;
            }
        }, function (err) {
            console.log(err);
        });
        return this.isAuthenticated;
    };
    return AuthGuard;
}());
AuthGuard.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
AuthGuard.ctorParameters = function () { return [
    { type: router_1.Router, },
    { type: authentication_service_1.AuthenticationService, },
]; };
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth-guard.component.js.map