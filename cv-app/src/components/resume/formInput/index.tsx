import { useEffect, useState } from "react";
import { Template } from "../../../services/models/template";
import { useGetTemplatesByIdMutation } from "../../../services/template";
import { ResultCode } from "../../../utils/enums";
import { ControlTemplate } from "../../controlTemplate";
import DropdownToggle, { DropdownToggleItem } from "../../dropdownToggle";
import PageLoading from "../../pageLoading";
import { Translation } from "../../translation";
//@ts-ignore
import Style from 'style-it';
import { Language } from "../../../services/models/language";
import { CSSContent } from "../../../services/models/cssContent";

type Props = {
    template: Template,
    onBackToSelect: (template: Template) => void,
}

const FormInput: React.FC<Props> = ({ template, onBackToSelect }) => {

    const [allowPreview, setAllowPreview] = useState<boolean>(false);
    const [templateState, setTemplateState] = useState<Template>();
    const [styleContent, setStyleContent] = useState<CSSContent>();
    const [languageContent, setLanguageContent] = useState<Language>();

    const [getTemplateById, getTemplateByIdStatus] = useGetTemplatesByIdMutation();

    const onSelectLanguage = (item: DropdownToggleItem) => {
        setLanguageContent(getTemplateByIdStatus.data?.resource.languages.filter(c => c.id == item.id)[0]);
    }
    const onSelectCSSStyle = (item: DropdownToggleItem) => {
        setStyleContent(getTemplateByIdStatus.data?.resource.cssContents.filter(c => c.id == item.id)[0]);
    }
    useEffect(() => {
        getTemplateById({ payload: { id: template.id } });
    }, []);
    useEffect(() => {
        if (getTemplateByIdStatus.isSuccess && getTemplateByIdStatus.data.resource != null) {
            setTemplateState(getTemplateByIdStatus.data.resource);
            setStyleContent(getTemplateByIdStatus.data.resource.cssContents[0]);
            setLanguageContent(getTemplateByIdStatus.data.resource.languages[0]);
        }
    }, [getTemplateByIdStatus]);


    return (<>
        <nav className="flexbox">
            <a className="btn btn-white" onClick={(e) => { e.preventDefault(); onBackToSelect(template) }} ><i className="ti-arrow-left fs-9 mr-2"></i><Translation tid="back_to_select_template" /></a>

            {templateState &&
                <>
                    <div>
                        <DropdownToggle setSelected={languageContent} cssClass={"btn-primary"} name="Select Language" onSelectHandler={onSelectLanguage} items={templateState.languages.map(l => { return { id: l.id, code: l.code, name: l.name } })} />
                        &nbsp;&nbsp;
                        <DropdownToggle setSelected={styleContent} cssClass={"btn-warning"} name="Select Style" onSelectHandler={onSelectCSSStyle} items={templateState.cssContents.map(l => { return { id: l.id, name: l.name } })} />
                    </div>
                </>}

            <a className={"btn btn-white " + (!allowPreview ? "disabled" : "")} href="#"><Translation tid="preview_template" /> <i className="ti-arrow-right fs-9 ml-2"></i></a>
        </nav>

        {getTemplateByIdStatus.isLoading && <PageLoading />}
        {templateState &&

            <div className="template-layout-container">
                <>
                    {<style type="text/css">{styleContent?.content}</style>}
                    <ControlTemplate teamplate={template} language={languageContent ? JSON.parse(languageContent?.content) : null} layout={templateState.controls} />
                </>
            </div>
        }

        <nav className="flexbox">
            <a className="btn btn-white" onClick={(e) => { e.preventDefault(); onBackToSelect(template) }} ><i className="ti-arrow-left fs-9 mr-2"></i><Translation tid="back_to_select_template" /></a>
            <a className={"btn btn-white " + (!allowPreview ? "disabled" : "")} href="#"><Translation tid="preview_template" /> <i className="ti-arrow-right fs-9 ml-2"></i></a>
        </nav>
    </>)
}

export default FormInput;