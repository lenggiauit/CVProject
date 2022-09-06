import React, { Component, ErrorInfo, ReactNode } from "react";
import { v4 } from "uuid";
import { Control } from "../../services/models/control";
import { ControlType } from "../../services/models/controlType";
import { Language } from "../../services/models/language";
import { Template } from "../../services/models/template";
import { Dictionary } from "../../types/type";
import { CONTAINER, DIV, EDITLABEL, H1, H2, H3, H4, H5, HEADER, INPUTTEXT, LABEL, SECTION } from "./controls";

interface Props {
    teamplate: Template,
    layout: Control[],
    language?: Dictionary<any>,
}

interface State {
    hasError: boolean;
}
class ControlTemplateBase extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }
    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

}



export class ControlTemplate extends ControlTemplateBase {

    renderTemplateControl(parentId: any, listControl: Control[]) {

        var control = listControl.filter(c => c.parentId === parentId).sort((a, b) => a.order > b.order ? 1 : -1);

        if (control) {
            var listRenderControl: any[] = [];
            control.forEach(c => {
                console.log(JSON.stringify(c.id))
                switch (c.type) {
                    case ControlType.Div:
                        listRenderControl.push(<DIV data={c} key={v4()} children={this.renderTemplateControl(c.id, listControl)} />);
                        break;
                    case ControlType.Container:
                        listRenderControl.push(<CONTAINER data={c} key={v4()} children={this.renderTemplateControl(c.id, listControl)} />);
                        break;
                    case ControlType.Header:
                        listRenderControl.push(<HEADER data={c} key={v4()} children={this.renderTemplateControl(c.id, listControl)} />);
                        break;
                    case ControlType.Main:
                        listRenderControl.push(<DIV data={c} key={v4()} children={this.renderTemplateControl(c.id, listControl)} />);
                        break;
                    case ControlType.Section:
                        listRenderControl.push(<SECTION data={c} key={v4()} children={this.renderTemplateControl(c.id, listControl)} />);
                        break;
                    case ControlType.H1:
                        listRenderControl.push(<H1 data={c} key={v4()} language={this.props.language} />);
                        break;
                    case ControlType.H2:
                        listRenderControl.push(<H2 data={c} key={v4()} language={this.props.language} />);
                        break;
                    case ControlType.H3:
                        listRenderControl.push(<H3 data={c} key={v4()} language={this.props.language} />);
                        break;
                    case ControlType.H4:
                        listRenderControl.push(<H4 data={c} key={v4()} language={this.props.language} />);
                        break;
                    case ControlType.H5:
                        listRenderControl.push(<H5 data={c} key={v4()} language={this.props.language} />);
                        break;
                    case ControlType.Label:
                        listRenderControl.push(<LABEL data={c} key={v4()} language={this.props.language} />);
                        break;
                    case ControlType.EditLabel:
                        listRenderControl.push(<EDITLABEL data={c} key={v4()} language={this.props.language} />);
                        break;
                    case ControlType.Input:
                        listRenderControl.push(<INPUTTEXT data={c} key={v4()} language={this.props.language} />);
                        break;
                }
            });

            return listRenderControl;

        }
        else {
            return "Missing type";
        }
    }

    public render() {

        return <>
            {this.renderTemplateControl(this.props.teamplate.id, this.props.layout)}
        </>;
    }
}

