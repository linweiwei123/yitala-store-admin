"use strict";
/**
 * Created by yitala on 2017/2/19.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GlobalLoadingComponent = (function () {
    function GlobalLoadingComponent() {
        this.loading = false;
    }
    GlobalLoadingComponent.prototype.showLoading = function () {
        this.loading = true;
    };
    GlobalLoadingComponent.prototype.cancelLoading = function () {
        this.loading = false;
    };
    return GlobalLoadingComponent;
}());
GlobalLoadingComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'global-loading',
                templateUrl: 'global-loading.component.html'
            },] },
];
/** @nocollapse */
GlobalLoadingComponent.ctorParameters = function () { return []; };
exports.GlobalLoadingComponent = GlobalLoadingComponent;
//# sourceMappingURL=global-loading.component.js.map