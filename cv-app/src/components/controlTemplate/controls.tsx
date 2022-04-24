import { ChangeEventHandler, Component, ReactText } from "react";
import { Control } from "../../services/models/control";
import { Language } from "../../services/models/language";
import { Dictionary } from "../../types/type";

interface Props {
    data: Control;
    language?: Dictionary<any>;
}

interface State {
    language?: Dictionary<any>;
    isEditMode: boolean;
    dataControl: Control;
}
export class TemplateTranslation extends Component<{ tid: any, dictionary?: Dictionary<any> }, State>   {
    public render() {
        if (this.props.dictionary) {
            console.log(JSON.stringify(this.props.dictionary));
            return (this.props.dictionary[this.props.tid] || this.props.tid);
        }
        else
            return (this.props.tid);
    }
};

export class DIV extends Component<Props, State> {

    public render() {
        console.log("render DIV");
        return <div className={this.props.data.cssClass}>{this.props.children}</div>;
    }
}
export class LABEL extends Component<Props, State> {

    public render() {
        console.log("render LABEL");
        return <label className={this.props.data.cssClass}><TemplateTranslation tid={this.props.data.text} dictionary={this.props.language} /></label>;
    }
}
export class H1 extends Component<Props, State> {
    public render() {
        console.log("render H1");
        return <h1 className={this.props.data.cssClass}><TemplateTranslation tid={this.props.data.text} dictionary={this.props.language} /></h1>;
    }
}
export class H2 extends Component<Props, State> {
    public render() {
        console.log("render H2");
        return <h2 className={this.props.data.cssClass}><TemplateTranslation tid={this.props.data.text} dictionary={this.props.language} /></h2>;
    }
}

export class H3 extends Component<Props, State> {
    public render() {
        console.log("render H3");
        return <h3 className={this.props.data.cssClass}><TemplateTranslation tid={this.props.data.text} dictionary={this.props.language} /></h3>;
    }
}

export class H4 extends Component<Props, State> {
    public render() {
        console.log("render H1");
        return <h4 className={this.props.data.cssClass}><TemplateTranslation tid={this.props.data.text} dictionary={this.props.language} /></h4>;
    }
}
export class H5 extends Component<Props, State> {
    public render() {
        console.log("render H1");
        return <h5 className={this.props.data.cssClass}><TemplateTranslation tid={this.props.data.text} dictionary={this.props.language} /></h5>;
    }
}
export class SECTION extends Component<Props, State> {
    public render() {
        console.log("render SECTION");
        return <section className={"section " + (this.props.data.cssClass ? this.props.data.cssClass : "")}>{this.props.children}</section>;
    }
}

export class CONTAINER extends Component<Props, State> {
    public render() {
        console.log("render CONTAINER");
        return <div className={"container " + (this.props.data.cssClass ? this.props.data.cssClass : "")}>{this.props.children}</div>;
    }
}

export class HEADER extends Component<Props, State> {
    public render() {
        console.log("render HEADER");
        return <header className={"section-header " + this.props.data.cssClass}>{this.props.children}</header>;
    }
}

export class INPUTTEXT extends Component<Props, State> {
    public render() {
        console.log("render INPUTTEXT");
        return <input type="text" className={"form-control " + this.props.data.cssClass} placeholder={this.props.data.placeholder}> </input>;
    }
}

export class EDITLABEL extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isEditMode: false,
            dataControl: this.props.data
        };
    }

    editlableOnClick = (e: any) => {
        this.setState({ isEditMode: true });
    }
    editlableOnBlur = (e: any) => {
        this.setState({ isEditMode: false });
    }

    editlableOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        let data = Object.assign({}, this.state.dataControl);
        data.value = e.currentTarget.value;
        this.setState({ dataControl: data });
    }
    editlableOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            let data = Object.assign({}, this.state.dataControl);
            data.value = e.currentTarget.value;
            this.setState({ dataControl: data, isEditMode: false });
        }
    }

    public render() {
        console.log("render EDITLABEL");
        return (
            <>
                <div className="editlable-container" onClick={this.editlableOnClick}>
                    {!this.state.isEditMode && <label className={"lable " + this.props.data.cssClass} ><TemplateTranslation tid={this.state.dataControl.value ? this.state.dataControl.value : this.state.dataControl.text} dictionary={this.props.language} /></label >}
                    {this.state.isEditMode && <input type="text" value={this.state.dataControl.value} onBlur={this.editlableOnBlur} onKeyDown={this.editlableOnKeyDown} onChange={this.editlableOnChange} placeholder={this.state.dataControl.placeholder} />}
                </div>
            </>)

    }
}

