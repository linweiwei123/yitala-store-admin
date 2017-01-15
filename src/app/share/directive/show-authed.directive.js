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
 * Created by yitala on 2017/1/15.
 */
var core_1 = require("@angular/core");
var authentication_service_1 = require("../service/authentication.service");
var ShowAuthedDirective = (function () {
    function ShowAuthedDirective(templateRef, authenticationService, viewContainerRef) {
        this.templateRef = templateRef;
        this.authenticationService = authenticationService;
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(ShowAuthedDirective.prototype, "showAuthed", {
        set: function (condition) {
            this.condition = condition;
        },
        enumerable: true,
        configurable: true
    });
    ShowAuthedDirective.prototype.ngOnInit = function () {
        var _this = this;
        console.log(1);
        this.authenticationService.isAuthenticated.subscribe(function (isAuthenticated) {
            if (isAuthenticated && _this.condition || !isAuthenticated && !_this.condition) {
                _this.viewContainerRef.createEmbeddedView(_this.templateRef);
            }
            else {
                _this.viewContainerRef.clear();
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], ShowAuthedDirective.prototype, "showAuthed", null);
    ShowAuthedDirective = __decorate([
        core_1.Directive({ selector: '[showAuthed]' }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, authentication_service_1.AuthenticationService, core_1.ViewContainerRef])
    ], ShowAuthedDirective);
    return ShowAuthedDirective;
}());
exports.ShowAuthedDirective = ShowAuthedDirective;
//# sourceMappingURL=show-authed.directive.js.map