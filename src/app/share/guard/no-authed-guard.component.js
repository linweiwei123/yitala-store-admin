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
var authentication_service_1 = require("../service/authentication.service");
var NoAuthedGuard = (function () {
    function NoAuthedGuard(authenticationService) {
        this.authenticationService = authenticationService;
    }
    NoAuthedGuard.prototype.canActivate = function () {
        return this.authenticationService.isAuthenticated.take(1).map(function (isAuth) { return !isAuth; });
    };
    return NoAuthedGuard;
}());
NoAuthedGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], NoAuthedGuard);
exports.NoAuthedGuard = NoAuthedGuard;
//# sourceMappingURL=no-authed-guard.component.js.map