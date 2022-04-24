import React, { useState } from "react";
import { Template } from "../../services/models/template";
import AddEditTemplateModal from "./modals/addEdit";

type Props = {
    onAdded: (templateType?: Template) => void,
}
const AddTemplateButton: React.FC<Props> = ({ onAdded }) => {

    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const onAddNewHandler = (tempType?: Template) => {
        setIsShowModal(false)
        onAdded(tempType);
    }
    return (<>
        {isShowModal && <AddEditTemplateModal onClose={onAddNewHandler} />}
        <div className="col-6 col-lg-4">
            <a className="card template-item-container shadow-1 hover-shadow-6" href="#" onClick={(e) => { e.preventDefault(); setIsShowModal(true) }} data-toggle="modal"  >
                <div className="card-body  d-flex text-center justify-content-center ">
                    <i className="bi bi-plus" style={{ fontSize: 42 }} ></i>
                </div>
            </a>
        </div>
    </>);
}



export default AddTemplateButton;