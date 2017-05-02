"use strict";
/**
 * Created by yitala on 2017/1/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var authentication_service_1 = require("../service/authentication.service");
var NoAuthedGuard = (function () {
    function NoAuthedGuard(authenticationService) {
        this.authenticationService = authenticationService;
    }
    NoAuthedGuard.prototype.canActivate = function () {
        return this.authenticationService.isAuthenticated.take(1).map(function (bool) {
            console.log(bool);
            return !bool;
        });
    };
    return NoAuthedGuard;
}());
NoAuthedGuard.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NoAuthedGuard.ctorParameters = function () { return [
    { type: authentication_service_1.AuthenticationService, },
]; };
exports.NoAuthedGuard = NoAuthedGuard;
//# sourceMappingURL=no-authed-guard.component.js.map