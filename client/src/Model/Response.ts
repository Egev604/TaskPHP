import {IProduct} from "./Product";

export interface IResponse {
        success?: string;
        error?: string;
}
export interface IResponseProducts {
        data?:IProduct[];
        error?: string;
}