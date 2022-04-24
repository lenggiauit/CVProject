import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout';
import { getLoggedUser, setLoggedUser } from '../../utils/functions';
import { Translation } from '../../components/translation';
import PageLoading from '../../components/pageLoading';
import { dictionaryList } from '../../locales';
import { useAppContext } from '../../contexts/appContext';
import { useUserUpdateAvatarMutation, useUserUpdateProfileMutation } from '../../services/account';
import { Form, Field, Formik, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { AppSetting } from '../../types/type';
import { ResultCode } from '../../utils/enums';
import { UpdateProfileRequest } from '../../services/communication/request/updateProfileRequest';
import { User } from '../../services/models/user';
import FormDataFile from "form-data";
import { useUploadImageMutation } from '../../services/fileService';
import { GlobalKeys } from '../../utils/constants';
import { toast } from 'react-toastify';

const appSetting: AppSetting = require('../../appSetting.json');

interface FormValues {
    fullName: any,
    jobTitle: any,
    phone: any,
    address: any,
    email: any
}

interface FormAvatarValues {
    file: any
}

let payload: UpdateProfileRequest;

const Profile: React.FC = (): ReactElement => {

    const { locale } = useAppContext();
    let currentUser = getLoggedUser();
    const [currentAvatar, setcurrentAvatar] = useState<string>(currentUser?.avatar ?? GlobalKeys.NoAvatarUrl);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    let initialValues: FormValues = { fullName: currentUser?.fullName, jobTitle: currentUser?.jobTitle, phone: currentUser?.phone, address: currentUser?.address, email: currentUser?.email };
    let initialAvatarValues: FormAvatarValues = { file: '' };
    const [updateProfile, { isLoading, data, error }] = useUserUpdateProfileMutation();
    const [updateAvatar, updateAvatarStatus] = useUserUpdateAvatarMutation();
    const [uploadFile, uploadData] = useUploadImageMutation();
    const handleEditMode = (value: boolean) => {
        setIsEditMode(value);
    }
    const validationSchema = () => {
        return Yup.object().shape({
            fullName: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),
            jobTitle: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),
            phone: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),
            address: Yup.string()
                .required(dictionaryList[locale]["RequiredField"]),
            email: Yup.string()
                .required(dictionaryList[locale]["RequiredField"])
                .email("Email is invalid!")
                .test("EmailAlreadyRegistered", dictionaryList[locale]["EmailAlreadyRegistered"], (email) => {
                    if (email) {
                        return new Promise((resolve, reject) => {
                            fetch(appSetting.BaseUrl + "account/checkEmailWithUser?email=" + email + "&id=" + currentUser?.id)
                                .then(response => response.json())
                                .then((json) => {
                                    if (json.resultCode == ResultCode.Invalid)
                                        resolve(false);
                                    else
                                        resolve(true);
                                }).catch(() => {
                                    resolve(false);
                                })
                        })
                    }
                    else {
                        return true;
                    }
                })
            ,
        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        payload = { fullName: values.fullName, email: values.email, jobTitle: values.jobTitle, address: values.address, phone: values.phone }
        updateProfile({ payload: payload });
    };

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
        if (data && data.resultCode == ResultCode.Success) {
            let updatedUser: User = currentUser!;
            updatedUser.fullName = payload.fullName;
            updatedUser.email = payload.email;
            updatedUser.phone = payload.phone;
            updatedUser.address = payload.address;
            updatedUser.jobTitle = payload.jobTitle;
            setLoggedUser(updatedUser);
            setIsEditMode(false);
            toast.success(dictionaryList[locale]["UpdatedSuccessfully"]);
        }
    }, [data]);

    useEffect(() => {
        if (uploadData.data && uploadData.data.resultCode == ResultCode.Success) {
            let updatedUser: User = currentUser!;
            updatedUser.avatar = uploadData.data.resource.url;
            setcurrentAvatar(uploadData.data.resource.url);
            setLoggedUser(updatedUser);
            updateAvatar({ payload: { avatar: uploadData.data.resource.url } });
        }
    }, [uploadData.data]);

    useEffect(() => {
        if (updateAvatarStatus.data && updateAvatarStatus.data.resultCode == ResultCode.Success) {
            toast.success(dictionaryList[locale]["UpdatedSuccessfully"]);
        }
    }, [updateAvatarStatus.data]);

    return (
        <>
            <Layout>
                {(isLoading || uploadData.isLoading) && <>
                    <PageLoading />
                </>}
                <section className="section overflow-hidden bg-gray">
                    <div className="container">
                        <header className="section-header">
                            <h2><Translation tid="Profile" /></h2>
                            <hr />
                        </header>
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card profile-card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <div className="profile-avatar-container">
                                                <img src={currentAvatar} alt={currentUser?.fullName} className="rounded-circle profile-avatar-img" width="150" />
                                                <div className="profile-avatar-edit-link-container">
                                                    <a className="profile-avatar-edit-link text-primary" href="#" onClick={handleUploadFile}>Edit</a>
                                                    <div className="hide">
                                                        <input type="file" className="hide" ref={inputFileUploadRef} onChange={handleSelectFile} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <h4>{currentUser && <> {currentUser.fullName} </>}</h4>
                                                <p className="text-warning mb-1">#{currentUser?.role.name}</p>
                                                <p className="text-success mb-1">{currentUser?.jobTitle}</p>
                                                <p className="text-muted font-size-sm">{currentUser && <> {currentUser.address} </>}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-8">
                                <div className="card profile-card mb-3">
                                    <div className="card-body">
                                        <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema} >
                                            <Form autoComplete="on">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0"><Translation tid="FullName" /></h6>
                                                    </div>
                                                    <div className="col-sm-9 profile-card-item">
                                                        {!isEditMode && <>
                                                            {currentUser?.fullName}
                                                        </>}
                                                        {isEditMode && <>
                                                            <div className="form-group-profile">
                                                                <Field type="text" className="form-control form-control-sm" name="fullName" />
                                                                <ErrorMessage
                                                                    name="fullName"
                                                                    component="div"
                                                                    className="alert alert-field alert-danger"
                                                                />
                                                            </div>
                                                        </>}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0"><Translation tid="JobTitle" /></h6>
                                                    </div>
                                                    <div className="col-sm-9 profile-card-item">
                                                        {!isEditMode && <>
                                                            {currentUser?.jobTitle}
                                                        </>}
                                                        {isEditMode && <>
                                                            <div className="form-group-profile">
                                                                <Field type="text" className="form-control form-control-sm" name="jobTitle" />
                                                                <ErrorMessage
                                                                    name="jobTitle"
                                                                    component="div"
                                                                    className="alert alert-field alert-danger"
                                                                />
                                                            </div>
                                                        </>}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0"><Translation tid="Email" /></h6>
                                                    </div>
                                                    <div className="col-sm-9 profile-card-item">
                                                        {!isEditMode && <>
                                                            {currentUser?.email}
                                                        </>}
                                                        {isEditMode && <>
                                                            <div className="form-group-profile">
                                                                <Field type="text" className="form-control form-control-sm" name="email" />
                                                                <ErrorMessage
                                                                    name="email"
                                                                    component="div"
                                                                    className="alert alert-field alert-danger"
                                                                />
                                                            </div>
                                                        </>}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0"><Translation tid="Phone" /></h6>
                                                    </div>
                                                    <div className="col-sm-9 profile-card-item">
                                                        {!isEditMode && <>
                                                            {currentUser?.phone}
                                                        </>}
                                                        {isEditMode && <>
                                                            <div className="form-group-profile">
                                                                <Field type="phone" className="form-control form-control-sm" name="phone" />
                                                                <ErrorMessage
                                                                    name="phone"
                                                                    component="div"
                                                                    className="alert alert-field alert-danger"
                                                                />
                                                            </div>
                                                        </>}
                                                    </div>
                                                </div>

                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0"><Translation tid="Address" /></h6>
                                                    </div>
                                                    <div className="col-sm-9 profile-card-item">
                                                        {!isEditMode && <>
                                                            {currentUser?.address}
                                                        </>}
                                                        {isEditMode && <>
                                                            <div className="form-group-profile">
                                                                <Field type="text" className="form-control form-control-sm" name="address" />
                                                                <ErrorMessage
                                                                    name="address"
                                                                    component="div"
                                                                    className="alert alert-field alert-danger"
                                                                />
                                                            </div>
                                                        </>}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12 align-items-center text-center">
                                                        {!isEditMode && <>
                                                            <button className="btn btn-round btn-primary" onClick={() => handleEditMode(true)} ><Translation tid="Edit" /></button>
                                                        </>}
                                                        {isEditMode && <>
                                                            <button type="submit" className="btn btn-round btn-primary"  ><Translation tid="Save" /></button>
                                                            &nbsp;
                                                            <button className="btn btn-round btn-secondary" onClick={() => handleEditMode(false)} ><Translation tid="Cancel" /></button>
                                                        </>}

                                                    </div>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>

        </>
    );
}

export default Profile;