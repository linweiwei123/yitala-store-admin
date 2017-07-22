"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return ShowAuthedDirective;
}());
ShowAuthedDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: '[showAuthed]' },] },
];
/** @nocollapse */
ShowAuthedDirective.ctorParameters = function () { return [
    { type: core_1.TemplateRef, },
    { type: authentication_service_1.AuthenticationService, },
    { type: core_1.ViewContainerRef, },
]; };
ShowAuthedDirective.propDecorators = {
    'showAuthed': [{ type: core_1.Input },],
};
exports.ShowAuthedDirective = ShowAuthedDirective;
//# sourceMappingURL=show-authed.directive.js.map