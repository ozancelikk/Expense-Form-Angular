import { ListResponseModel } from "./listResponseModel";

export interface ListPartitionResponseModel<T> extends ListResponseModel<T>{
    partitionData:any
}