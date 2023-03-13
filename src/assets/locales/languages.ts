import { EN } from "./en";
import { FR } from "./fr";
import { TR } from "./tr";



export abstract  class Languages{

    public static lngs = new Map<string, any>([["en",new EN],["tr",new TR],["fr",new FR]]);

}