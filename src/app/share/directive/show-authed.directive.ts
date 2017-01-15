/**
 * Created by yitala on 2017/1/15.
 */
import {Directive, OnInit, TemplateRef, ViewContainerRef, Input} from "@angular/core";
import {AuthenticationService} from "../service/authentication.service";
@Directive({selector:'[showAuthed]'})
export class ShowAuthedDirective implements OnInit{

    condition:boolean;

    @Input() set showAuthed(condition:boolean){
        this.condition = condition;
    }

    constructor(
        private templateRef:TemplateRef<any>,
        private authenticationService:AuthenticationService,
        private viewContainerRef:ViewContainerRef
    ){}

    ngOnInit():void{
        console.log(1);
        this.authenticationService.isAuthenticated.subscribe(
            (isAuthenticated)=>{
                if(isAuthenticated && this.condition || !isAuthenticated && !this.condition){
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                }
                else {
                    this.viewContainerRef.clear();
                }
            }
        )
    }


}