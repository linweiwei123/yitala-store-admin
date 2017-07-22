"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var AlertComponent = (function () {
    function AlertComponent(activeModal) {
        this.activeModal = activeModal;
    }
    return AlertComponent;
}());
AlertComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ngbd-modal-content',
                templateUrl: './alert.component.html'
            },] },
];
/** @nocollapse */
AlertComponent.ctorParameters = function () { return [
    { type: ng_bootstrap_1.NgbActiveModal, },
]; };
AlertComponent.propDecorators = {
    'msg': [{ type: core_1.Input },],
};
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=alert.component.js.map