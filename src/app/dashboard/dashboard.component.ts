/**
 * Created by Linweiwei on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
@Component({
    selector:"my-dashboard",
    templateUrl:"dashboard.component.html"
})

export class DashboardComponent implements OnInit{

    ngOnInit(): void {
        $("#id").html(`<h2>jquery标题</h2>`);
    }


}