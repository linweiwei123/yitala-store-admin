import {Injectable} from "@angular/core";
import {ProductDesc} from "../models/productDesc.model";
import {Blog} from "../../blog/manager/Blog";
/**
 * Created by yitala on 2017/7/12.
 */
@Injectable()
export class StateService{

    public productListShowType:string = 'th';

    public productDesc:ProductDesc = new ProductDesc();

    public blog:Blog = new Blog();
}