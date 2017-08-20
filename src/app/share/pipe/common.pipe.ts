/**
 * Created by yitala on 2017/8/20.
 */

import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name:'orderState'
})

export class OrderStatePipe implements PipeTransform{

    transform(value: any, ...args: any[]) {
        let text = "";
        switch (value){
            case 'confirm':text = "确认中";break;
            case 'shipped':text = "已发货";break;
            case 'finish':text = "结束";break;
            default:text = value;break;
        }
        return text;
    }

}