import { ControlType } from "./controlType";

export type Control = {
    id: any,
    name: any,
    parentId: any,
    type: ControlType,
    editType?: ControlType,
    order: any,
    text?: any,
    placeholder?: any,
    value?: any,
    cssClass?: any,
    childs: Control

};

