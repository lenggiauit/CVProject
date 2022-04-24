import React, { HtmlHTMLAttributes, ReactElement, useState } from 'react';
import { Translation } from '../../components/translation';
import { withFormik, FormikProps, FormikErrors, Form, Field, Formik, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Loader from 'react-loader-spinner';
import { useAppContext } from '../../contexts/appContext';
import { dictionaryList } from '../../locales';
import { useForgotPasswordMutation } from '../../services/account';

import PageLoading from '../../components/pageLoading';
import { ResultCode } from '../../utils/enums';

interface FormValues {
    email: string;
}

const ForgotPassword: React.FC = (): ReactElement => {
    const { locale } = useAppContext();

    const [forgotPassword, { isLoading, data, error }] = useForgotPasswordMutation();

    let initialValues: FormValues = { email: '' };

    const validationSchema = () => {
        return Yup.object().shape({
            email: Yup.string().required(dictionaryList[locale]["RequiredField"])
                .email("Email is invalid!")

        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        forgotPassword({ payload: { email: values.email } });
    }
    if (data && data.resultCode == ResultCode.Success) {
        return (<>
            <div className="div-centered">
                <div className="main-content">
                    <div className="bg-white rounded shadow-7 w-500 mw-100 p-6 position-absolute top-50 start-50 translate-middle">
                        <h5 className="mb-7"><Translation tid="ForgotPassword" /></h5>
                        <p><Translation tid="ForgotpasswordSubmitedSuccessMsg" /></p>
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
                            <h5 className="mb-7"><Translation tid="ForgotPassword" /></h5>
                            <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema} >
                                <Form autoComplete="off">
                                    <div className="form-group">
                                        <Field type="text" className="form-control" name="email" placeholder="Email" />
                                        <ErrorMessage
                                            name="email"
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
                            {data && data.resultCode == ResultCode.NotExistEmail.valueOf() && <>
                                <div className="alert alert-danger" role="alert">
                                    <Translation tid="NotExistEmail" />
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

export default ForgotPassword;