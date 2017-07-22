"use strict";
/**
 * Created by Linweiwei on 2016/12/22.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var header_component_1 = require("./layout/header/header.component");
var alert_component_1 = require("./alert/alert.component");
var show_authed_directive_1 = require("./directive/show-authed.directive");
var global_loading_component_1 = require("./loading/global-loading.component");
var ShareModule = (function () {
    function ShareModule() {
    }
    return ShareModule;
}());
ShareModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule
                ],
                declarations: [
                    header_component_1.HeaderComponent,
                    alert_component_1.AlertComponent,
                    global_loading_component_1.GlobalLoadingComponent,
                    show_authed_directive_1.ShowAuthedDirective
                ],
                providers: [],
                exports: [
                    header_component_1.HeaderComponent,
                    alert_component_1.AlertComponent,
                    global_loading_component_1.GlobalLoadingComponent,
                    show_authed_directive_1.ShowAuthedDirective
                ],
                schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
/** @nocollapse */
ShareModule.ctorParameters = function () { return []; };
exports.ShareModule = ShareModule;
//# sourceMappingURL=share.module.js.map