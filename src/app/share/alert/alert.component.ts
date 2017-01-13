import {Component,Input} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'ngbd-modal-content',
    templateUrl:'./alert.component.html'
})
export class AlertComponent {
    @Input() msg:string;

    constructor(public activeModal: NgbActiveModal) {}
}