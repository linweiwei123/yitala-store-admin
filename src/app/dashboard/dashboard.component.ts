/**
 * Created by Linweiwei on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
import {AlertComponent} from "../share/alert/alert.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector:"my-dashboard",
    templateUrl:"dashboard.component.html"
})

export class DashboardComponent implements OnInit{

    constructor(
        private modalService:NgbModal
    ){}

    ngOnInit(): void {
       // $("#id").html(`<h2>jquery标题</h2>`);
    }

    openModel(msg:string):void{
        const modalRef = this.modalService.open(AlertComponent,{backdrop:"static",keyboard:false,size:"sm"});
        modalRef.componentInstance.msg = msg;
    }

}