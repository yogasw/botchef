import {IColumn, IJsonSheet} from "json-as-xlsx";

export type IntentExcel = {
    intent?: string
    input: string
    response?: string
    response_type?: string
    parent?: string
    back_to_parent?: boolean
    tag?: string
    is_fallback?: boolean
}

export interface CustomColumn extends IColumn {
  value(row: any) : any;
}

export interface CustomSheet extends IJsonSheet {
  columns: CustomColumn[];
}