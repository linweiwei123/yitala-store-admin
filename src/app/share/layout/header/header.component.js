"use strict";
/**
 * Created by Linweiwei on 2016/12/22.
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
var router_1 = require("@angular/router");
var authentication_service_1 = require("../../service/authentication.service");
var HeaderComponent = (function () {
    function HeaderComponent(route, router, authenticationService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (event) {
            var currentRoute = _this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
            }
            var obj = currentRoute.snapshot.data;
            //console.log(obj);
            _this.currentRoute = obj["name"];
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(["/login"]);
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: "layout-header",
        templateUrl: "header.component.html"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        authentication_service_1.AuthenticationService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map