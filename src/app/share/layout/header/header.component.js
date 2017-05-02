"use strict";
/**
 * Created by Linweiwei on 2016/12/22.
 */
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
HeaderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: "layout-header",
                templateUrl: "header.component.html"
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = function () { return [
    { type: router_1.ActivatedRoute, },
    { type: router_1.Router, },
    { type: authentication_service_1.AuthenticationService, },
]; };
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map