import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../contexts/appContext";
import { Project } from "../../../services/models/project";
import { Translation } from "../../translation";
import * as Yup from "yup";
import { dictionaryList } from "../../../locales";
import { AppSetting } from "../../../types/type";
import { ResultCode } from "../../../utils/enums";
import { useCreateProjectMutation } from "../../../services/project";
import PageLoading from "../../pageLoading";
import { getProjectStatus } from "../../../utils/initData";
import { useGetProjectStatusQuery } from "../../../services/refService";
import LocalSpinner from "../../localSpinner";

let appSetting: AppSetting = require('../../../appSetting.json');

interface FormValues {
    name: string;
    description: string;
    pstatus: string

}

type Props = {
    proj?: Project,
    onClose: () => void,
    onSubmit: (project: Project) => void,
}

const AddEditTemplateTypeModal: React.FC<Props> = ({ proj, onClose, onSubmit }) => {

    const { locale } = useAppContext();
    const [project, setProject] = useState<Project | undefined>(proj);
    const [createProject, createProjectStatus] = useCreateProjectMutation();
    const projectStatusData = useGetProjectStatusQuery({ payload: {} });

    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClose();
    }

    const onCloseHandler: any = () => {
        onClose();
    }

    let initialValues: FormValues = { name: '', description: '', pstatus: '' };

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            description: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),
            pstatus: Yup.string()
                .required(dictionaryList[locale]["RequiredField"])

        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        if (!project) {
            createProject({ payload: { name: values.name, description: values.description, statusId: values.pstatus } });
        }
    }

    useEffect(() => {
        if (createProjectStatus.isSuccess && createProjectStatus.data.resultCode == ResultCode.Success) {
            window.location.href = "/projects/" + createProjectStatus.data.resource.id;
        }
    }, [createProjectStatus])



    // 
    return (<>
        {createProjectStatus.isLoading && <PageLoading />}
        <div className="modal fade show" role="dialog" aria-labelledby="addEditProjectModalLabel" aria-modal="true"  >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="addEditProjectModalLabel">
                            {!project && <Translation tid="CreateNewProject" />}
                            {project && <Translation tid="EditProject" />}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseHandler} >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body pb-0 pt-5">

                        <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema} validateOnChange={false}  >
                            {({ values, errors, touched }) => (
                                <Form autoComplete="off">
                                    <div className="form-group">
                                        <span className="mr-2"> Status:</span>
                                        {projectStatusData.isLoading && <LocalSpinner />}
                                        {projectStatusData.data && <>
                                            {projectStatusData.data.resource.map((status) => (
                                                <>
                                                    <label className={"btn btn-round btn-light" + (values.pstatus == status.id ? " active" : "")}>
                                                        <Field type="radio" name="pstatus" value={status.id} checked={values.pstatus == status.id} />{status.name}
                                                    </label>
                                                </>
                                            ))}
                                        </>
                                        }
                                        <ErrorMessage
                                            name="pstatus"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field type="text" className="form-control" name="name" placeholder="name" />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Field type="textarea" as="textarea" row={7} className="form-control" name="description" placeholder="description" />
                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">

                                    </div>
                                    <div className="modal-footer border-0 pr-0 pl-0">
                                        <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                                        <button type="submit" className="btn btn-primary" >
                                            {project && <Translation tid="btnSave" />}
                                            {!project && <Translation tid="btnCreate" />}
                                        </button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>



                </div>
            </div>
        </div>
    </>);
}

export default AddEditTemplateTypeModal;