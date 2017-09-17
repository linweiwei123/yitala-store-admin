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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var header_component_1 = require("./layout/header/header.component");
var alert_component_1 = require("./alert/alert.component");
var show_authed_directive_1 = require("./directive/show-authed.directive");
var global_loading_component_1 = require("./loading/global-loading.component");
var common_pipe_1 = require("./pipe/common.pipe");
var file_manager_component_1 = require("../common/file-manager.component");
var ShareModule = (function () {
    function ShareModule() {
    }
    return ShareModule;
}());
ShareModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule
        ],
        declarations: [
            header_component_1.HeaderComponent,
            alert_component_1.AlertComponent,
            global_loading_component_1.GlobalLoadingComponent,
            show_authed_directive_1.ShowAuthedDirective,
            common_pipe_1.OrderStatePipe,
            file_manager_component_1.FileManagerComponent
        ],
        providers: [],
        exports: [
            header_component_1.HeaderComponent,
            alert_component_1.AlertComponent,
            global_loading_component_1.GlobalLoadingComponent,
            show_authed_directive_1.ShowAuthedDirective,
            common_pipe_1.OrderStatePipe,
            file_manager_component_1.FileManagerComponent
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], ShareModule);
exports.ShareModule = ShareModule;
//# sourceMappingURL=share.module.js.map