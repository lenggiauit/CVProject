import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../contexts/appContext";
import { Project } from "../../../services/models/project";
import { Translation } from "../../translation";
import * as Yup from "yup";
import { dictionaryList } from "../../../locales";
import { AppSetting } from "../../../types/type";
import { ResultCode } from "../../../utils/enums";
import { useCreateEditTemplateTypeMutation } from "../../../services/template";
import PageLoading from "../../pageLoading";
import { TemplateType } from "../../../services/models/templateType";
import * as uuid from "uuid";

let appSetting: AppSetting = require('../../../appSetting.json');

interface FormValues {
    id: string,
    name: string,
    description: string,
    isArchived: boolean
}

type Props = {
    tempType?: TemplateType,
    onClose: (templateType?: TemplateType) => void,
}

const AddEditTemplateTypeModal: React.FC<Props> = ({ tempType, onClose }) => {

    const { locale } = useAppContext();
    const [templateType, setTemplateType] = useState<TemplateType | undefined>(tempType);
    const [createEditTemplateType, createEditTemplateTypeStatus] = useCreateEditTemplateTypeMutation();
    const [archived, setArchived] = useState<boolean>(tempType != null ? tempType.isArchived : false);
    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClose();
    }

    const onCloseHandler: any = () => {
        onClose();
    }

    let initialValues: FormValues = { id: (tempType == null ? uuid.NIL : tempType.id), name: (tempType != null ? tempType?.name: ""), description: ( tempType != null ? tempType?.description: ""), isArchived: (tempType != null ? tempType.isArchived : false) };

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            description: Yup.string()
                .required(dictionaryList[locale]["RequiredField"])

        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {

        createEditTemplateType({ payload: { id: values.id, name: values.name, description: values.description, isArchived: archived } });

    }

    useEffect(() => {
        if (createEditTemplateTypeStatus.isSuccess && createEditTemplateTypeStatus.data.resultCode == ResultCode.Success) {
            onClose(createEditTemplateTypeStatus.data.resource);
        }
    }, [createEditTemplateTypeStatus])

    const handleArchivedclick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setArchived(!archived);
    }

    // 
    return (<>
        {createEditTemplateTypeStatus.isLoading && <PageLoading />}
        <div className="modal fade show" role="dialog" aria-labelledby="addEditTemplateTypeModalLabel" aria-modal="true"  >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="addEditTemplateTypeModalLabel">
                            {!tempType && <Translation tid="CreateNewTemplateType" />}
                            {tempType && <Translation tid="EditTemplateType" />}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseHandler} >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body pb-0 pt-5"> 
                        <Formik initialValues={initialValues} 
                        onSubmit={handleOnSubmit} 
                        validationSchema={validationSchema} 
                        validateOnChange={false}  >
                            {({ values, errors, touched }) => (
                                <Form autoComplete="off">
                                    <div className="form-group">
                                        <Field type="hidden" name="id" />
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
                                        <div className="custom-control custom-checkbox">
                                            <Field type="checkbox" className="custom-control-input" name="isArchived" checked={archived} />
                                            <label className="custom-control-label" onClick={handleArchivedclick} ><Translation tid="archived" /></label>
                                        </div>
                                    </div> 
                                    <div className="modal-footer border-0 pr-0 pl-0">
                                        <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                                        <button type="submit" className="btn btn-primary" >
                                            {tempType && <Translation tid="btnSave" />}
                                            {!tempType && <Translation tid="btnCreate" />}
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