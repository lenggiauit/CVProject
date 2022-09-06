import React from "react";
import { Template } from "../../services/models/template";
import { TemplateType } from "../../services/models/templateType";

type Props = {
    template: Template,
    onSelected: (template: Template) => void,
}

const TemplateItem: React.FC<Props> = ({ template, onSelected }) => {

    return (<>
        <div className="col-12 col-lg-4">
            <div className="card template-item-container shadow-1 hover-shadow-6"  onClick={(e) => { e.preventDefault(); onSelected(template) }}   >
                <div className="card d-block">
                    <div className="card-img-top template-image">
                        <img src={template.image} alt={template.name} />
                        <div className="badges">
                            <a className="badge badge-warning" href="#">{template.templateType.name}</a>
                        </div>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">{template.name}</h5>
                        <p>{template.description}</p>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default TemplateItem;