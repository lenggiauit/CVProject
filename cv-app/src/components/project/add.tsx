import React, { useState } from "react";
import { boolean } from "yup/lib/locale";
import { Project } from "../../services/models/project";
import { ProjectDetail } from "../../services/models/projectDetail";
import AddEditProjectModal from "./modals/addEdit";

const AddProjectButton: React.FC = () => {

    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    const onAddNewProjectHandler = (project: Project) => {


    }


    return (<>
        {isShowModal && <AddEditProjectModal onClose={() => { setIsShowModal(false) }} onSubmit={onAddNewProjectHandler} />}
        <div className="col-6 col-lg-3">
            <a className="card shadow-1 hover-shadow-6" href="#" onClick={(e) => { e.preventDefault(); setIsShowModal(true) }} data-toggle="modal"  >
                <div className="card-body project-container d-flex text-center justify-content-center ">
                    <i className="bi bi-plus" style={{ fontSize: 42 }} ></i>
                </div>
            </a>
        </div>
    </>);
}



export default AddProjectButton;