import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps, FormikValues, useFormikContext } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../contexts/appContext";
import { Translation } from "../../translation";
import * as Yup from "yup";
import { dictionaryList } from "../../../locales";
import { AppSetting } from "../../../types/type";
import { ResultCode } from "../../../utils/enums";
import { useCreateEditTemplateMutation, useGetQueryTemplateTypesQuery, useGetTemplateTypesMutation } from "../../../services/template";
import PageLoading from "../../pageLoading";
import * as uuid from "uuid";
import { Template } from "../../../services/models/template";
import { useUploadImageMutation, useUploadPackageFileMutation } from "../../../services/fileService";
import { GlobalKeys } from "../../../utils/constants";
import LocalSpinner from "../../localSpinner";
import { v4 } from "uuid";

let appSetting: AppSetting = require('../../../appSetting.json');

interface FormValues {
    id: string,
    templateTypeId: string,
    image: string,
    name: string,
    package: string,
    description: string,
    isArchived: boolean
}

type Props = {
    temp?: Template,
    onClose: (template?: Template) => void,
}

const AddEditTemplateModal: React.FC<Props> = ({ temp, onClose }) => {
     
    const { locale } = useAppContext();
    const [template, setTemplate] = useState<Template | undefined>(temp);
    const [createEditTemplate, createEditTemplateStatus] = useCreateEditTemplateMutation();
    const getQueryTemplateTypesStatus = useGetQueryTemplateTypesQuery({ payload: { isArchived: false } });
    const [archived, setArchived] = useState<boolean>(temp != null ? temp.isArchived : false);
    const [uploadFile, uploadData] = useUploadImageMutation();
    const [uploadPackageFile, uploadPackageData] = useUploadPackageFileMutation();
    const [currentTemplateImage, setCurrentTemplateImage] = useState<string>(temp?.image ?? GlobalKeys.NoTemplateImageUrl);
    const [currentPackage, setCurrentPackage] = useState<string>();

    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClose();
    }

    const onCloseHandler: any = () => {
        onClose();
    }
     
    let initialValues: FormValues = {
        id: (temp == null ? uuid.NIL : temp.id),
        templateTypeId: (temp != null ? temp.templateType.id : ""),
        name: (temp != null ? temp.name : ""),
        image: (temp != null ? temp.image : null),
        package: (temp != null ? temp.package : ""),
        description: (temp != null ? temp.description : ""),
        isArchived: (temp != null ? temp.isArchived : false),
    };

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            description: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),
            templateTypeId: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]), 
            package: Yup.object().nullable().notRequired()
        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {

        createEditTemplate({ payload: { id: values.id, templateTypeId: values.templateTypeId, name: values.name, image: currentTemplateImage, description: values.description, package: currentPackage, isArchived: archived } });
    }

    useEffect(() => {
        if (createEditTemplateStatus.isSuccess && createEditTemplateStatus.data.resultCode == ResultCode.Success) {
            onClose(createEditTemplateStatus.data.resource);
        }
    }, [createEditTemplateStatus])

    const handleArchivedclick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setArchived(!archived);
    }

    const inputFileUploadRef = useRef<HTMLInputElement>(null);

    const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
        let file = e.target.files?.item(0);
        if (file) {
            const formData = new FormData();
            formData.append("file", file!);
            uploadFile(formData);
        }
    }

    const handleUploadFile: React.MouseEventHandler<HTMLAnchorElement> = (e) => { 
        inputFileUploadRef.current?.click();
    }

    useEffect(() => {
        if (uploadData.data && uploadData.data.resultCode == ResultCode.Success) {
            setCurrentTemplateImage(uploadData.data.resource.url);
        }
    }, [uploadData.data]);

    const handleSelectPackageFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let file = e.target.files?.item(0);
        if (file) {
            const formData = new FormData();
            formData.append("file", file!);
            uploadPackageFile(formData);
        }
    }


    useEffect(() => {
        if (uploadPackageData.data && uploadPackageData.data.resultCode == ResultCode.Success) {
            setCurrentPackage(uploadPackageData.data.resource.url);

        }
    }, [uploadPackageData]);
    
    // 
    return (<>
        {(createEditTemplateStatus.isLoading || uploadPackageData.isLoading || uploadData.isLoading) && <PageLoading />}
        <div className="modal fade show" role="dialog" aria-labelledby="addEditTemplateModalLabel" aria-modal="true"  >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="addEditTemplateModalLabel">
                            {!temp && <Translation tid="CreateNewTemplate" />}
                            {temp && <Translation tid="EditTemplate" />}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseHandler} >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body pb-0 pt-5">

                        <Formik 
                        initialValues={initialValues} onSubmit={handleOnSubmit} 
                        validationSchema={validationSchema} validateOnChange={false} enableReinitialize={false} >
                            {({ handleChange, values, errors, touched }) => (
                                <Form autoComplete="off">
                                    <div className="form-group align-items-center text-center">
                                        <img src={currentTemplateImage} alt={"template Image"} className="template-upload-img" width="350" />
                                        <div className="profile-avatar-edit-link-container mt-4">  
                                                <input type="file" name="image" ref={inputFileUploadRef} onChange={handleSelectFile} /> 
                                        </div>
                                    </div>
                                    <div className="form-group"> 
                                        <Field as="select" type="select" name="templateTypeId"  
                                            className="form-control" placeholder="Template Type"
                                            defaultValue={temp != null ? temp.templateType.id : ""}  
                                            //value={temp != null ? temp.templateType.id : ""}  
                                            //onChange={()=>{handleChange("templateTypeId")}}
                                            >  
                                            <option value="" label="Select a template type">Select a template type</option>
                                             {getQueryTemplateTypesStatus.data && <>
                                                {getQueryTemplateTypesStatus.data.resource.map((type) => ( 
                                                        <option  key={type.id} value={type.id} >{type.name}</option> 
                                                ))}
                                            </>
                                            }  
                                        </Field>
                                        <ErrorMessage
                                            name="templateTypeId"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
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
                                    <Field type="textarea" as="textarea" row={4} className="form-control" name="description" placeholder="description" />
                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                        <Field type="file" name="package" className="custom-file-input" onChange={handleSelectPackageFile} accept=".zip" />
                                            <label className="custom-file-label">{currentPackage != null ? currentPackage : <Translation tid="TemplatePackage" /> }</label>
                                        </div> 
                                        <ErrorMessage
                                            name="package"
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
                                            {temp && <Translation tid="btnSave" />}
                                            {!temp && <Translation tid="btnCreate" />}
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

export default AddEditTemplateModal;