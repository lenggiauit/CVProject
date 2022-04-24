import React from "react";
import { TemplateType } from "../../services/models/templateType";

type Props = {
    templateType: TemplateType,
    onSelected: (templateType: TemplateType) => void,
}

const TemplateTypeItem: React.FC<Props> = ({ templateType, onSelected }) => {

    return (<>
        <div className="col-6 col-lg-3">
            <a className="card shadow-1 hover-shadow-6" href="#" onClick={(e) => { e.preventDefault(); onSelected(templateType) }}   >
                <div className="card-body template-type-item-container">
                    <h6 className="mb-0">{templateType.name}</h6>
                    <div>
                        <small className="small-4 ls-2">{templateType.description.length > 42 ? templateType.description.substring(0, 42) : templateType.description}</small>
                    </div>
                </div>
            </a>
        </div>
    </>)
}

export default TemplateTypeItem;