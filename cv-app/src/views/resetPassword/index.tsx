import React, { HtmlHTMLAttributes, ReactElement, useState } from 'react';
import { Translation } from '../../components/translation';
import { withFormik, FormikProps, FormikErrors, Form, Field, Formik, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Loader from 'react-loader-spinner';
import { useAppContext } from '../../contexts/appContext';
import { dictionaryList } from '../../locales';
import { useResetPasswordMutation } from '../../services/account';
import { Md5 } from 'md5-typescript';
import PageLoading from '../../components/pageLoading';
import { ResultCode } from '../../utils/enums';

interface FormValues {
    password: string;
    confirmPassword: string;
}
const ResetPassword: React.FC = () => {

    const { locale } = useAppContext();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userInfo = urlParams.get('code');

    const [resetPassword, { isLoading, data, error }] = useResetPasswordMutation();

    let initialValues: FormValues = { password: '', confirmPassword: '' };

    const validationSchema = () => {
        return Yup.object().shape({
            password: Yup.string().required(dictionaryList[locale]["RequiredField"]).min(8, dictionaryList[locale]["PasswordsLengthRule"]),
            confirmPassword: Yup.string().required(dictionaryList[locale]["RequiredField"])
                .oneOf([Yup.ref('password'), null], dictionaryList[locale]["PasswordsMustMatch"]),

        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        let pwdEncrypted = Md5.init(values.password);
        resetPassword({ payload: { userInfo: userInfo, newPassword: pwdEncrypted } });
    }
    if (!userInfo || userInfo.length === 0) {
        return (<>
            <div className="div-centered">
                <div className="main-content">
                    <div className="bg-white rounded shadow-7 w-500 mw-100 p-6 position-absolute top-50 start-50 translate-middle">
                        <p className="text-center"><Translation tid="Error" /></p>
                        <hr className="w-30" />
                        <p className="text-center text-muted small-2"><Translation tid="BackTo" />
                            <a href="/login"> <Translation tid="Login" /></a></p>
                    </div>
                </div>
            </div>
        </>);
    }
    else if (data && data.resultCode == ResultCode.Success) {
        return (<>
            <div className="div-centered">
                <div className="main-content">
                    <div className="bg-white rounded shadow-7 w-500 mw-100 p-6 position-absolute top-50 start-50 translate-middle">
                        <h5 className="mb-7"><Translation tid="ResetPassword" /></h5>
                        <p><Translation tid="ResetPasswordSuccessMsg" /></p>
                        <hr className="w-30" />
                        <p className="text-center text-muted small-2"><Translation tid="BackTo" />
                            <a href="/login"> <Translation tid="Login" /></a></p>
                    </div>
                </div>
            </div>
        </>)
    }
    else {

        return (
            <>
                {isLoading && <>
                    <PageLoading />
                </>}
                <div className="div-centered">
                    <div className="main-content">
                        <div className="bg-white rounded shadow-7 w-400 mw-100 p-6 position-absolute top-50 start-50 translate-middle">
                            <h5 className="mb-7"><Translation tid="ResetPassword" /></h5>
                            <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema} >
                                <Form autoComplete="off">
                                    <div className="form-group">
                                        <Field type="text" className="form-control" name="password" placeholder="New password" />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" className="form-control" name="confirmPassword" placeholder="Confirm password" />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="alert alert-field alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-block btn-primary" type="submit" disabled={isLoading} >
                                            <Translation tid="Confirm" />
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                            {data && data.resultCode == ResultCode.Expired.valueOf() && <>
                                <div className="alert alert-danger" role="alert">
                                    <Translation tid="ResetPasswordExpiredMsg" />
                                </div>
                            </>}
                            {data && data.resultCode == ResultCode.NotExistUser.valueOf() && <>
                                <div className="alert alert-danger" role="alert">
                                    <Translation tid="NotExistUserMsg" />
                                </div>
                            </>}
                            {data && data.resultCode == ResultCode.Error.valueOf() && <>
                                <div className="alert alert-danger" role="alert">
                                    <Translation tid="ErrorMsg" />
                                </div>
                            </>}
                            <hr className="w-30" />
                            <p className="text-center text-muted small-2"><Translation tid="BackTo" />
                                <a href="/login"> <Translation tid="Login" /></a></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ResetPassword;