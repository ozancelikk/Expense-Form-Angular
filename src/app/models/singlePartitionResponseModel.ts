import { SingleResponseModel } from "./singleResponseModel";

export interface SinglePartitionResponseModel<T> extends SingleResponseModel<T>{
    partitionData:any
}