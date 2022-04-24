import { useState } from "react";
import { Template } from "../../../services/models/template";
import PageLoading from "../../pageLoading";
import { Translation } from "../../translation";
import FormInput from "../formInput";
import TemplatesList from "../selectTemplate/list";

type Props = {
    template: Template,
    onSelected: (template: Template) => void,
}

const CreateTemplate: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selecttedTemplate, setSelecttedTemplate] = useState<Template | null>();

    const onLoadingHandler = (value: boolean) => {
        setIsLoading(value);
    }
    const onSelectHandler = (temp: Template) => {
        setSelecttedTemplate(temp);
    }
    const onBackToSelectHandler = (e: any) => {
        setSelecttedTemplate(null);
    }

    return (<>
        {isLoading && <PageLoading />}
        {selecttedTemplate == null && <>
            <section className="section overflow-hidden bg-gray">
                <div className="container">
                    <header className="section-header mb-0">
                        <h2><Translation tid="selectTemplate" /></h2>
                        <hr />
                    </header>
                    <TemplatesList onSelected={onSelectHandler} onLoading={onLoadingHandler} />
                </div>
            </section>
        </>}
        {selecttedTemplate != null && <>
            <section className="section overflow-hidden bg-gray">
                <div className="container">
                    <header className="section-header mb-0">
                        <h2><Translation tid="input_your_information" /></h2>
                        <hr />
                    </header>
                    <FormInput template={selecttedTemplate} onBackToSelect={onBackToSelectHandler} />
                </div>
            </section>
        </>}
    </>)
}

export default CreateTemplate;