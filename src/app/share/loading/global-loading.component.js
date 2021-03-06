"use strict";
/**
 * Created by yitala on 2017/2/19.
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
GlobalLoadingComponent = __decorate([
    core_1.Component({
        selector: 'global-loading',
        templateUrl: 'global-loading.component.html'
    }),
    __metadata("design:paramtypes", [])
], GlobalLoadingComponent);
exports.GlobalLoadingComponent = GlobalLoadingComponent;
//# sourceMappingURL=global-loading.component.js.map