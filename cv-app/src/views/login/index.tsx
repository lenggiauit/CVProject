import React, { ReactElement, useState } from 'react';
import { Translation } from '../../components/translation';
import { Form, Field, Formik, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { dictionaryList } from '../../locales';
import { useAppContext } from '../../contexts/appContext';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import { AppSetting } from '../../types/type';
import { useUserLoginMutation } from '../../services/account';
import { Md5 } from "md5-typescript";
import PageLoading from '../../components/pageLoading';
import { useDispatch } from "react-redux";
import { logout, setLoggedUser } from '../../utils/functions';
import { ResultCode } from '../../utils/enums';
let appSetting: AppSetting = require('../../appSetting.json');

interface FormValues {
    username: string;
    password: string;
}

const Login: React.FC = (): ReactElement => {
    logout();
    const { locale, } = useAppContext();
    const dispatch = useDispatch();
    let initialValues: FormValues = { username: '', password: '' };
    const rememberMeStr = localStorage.getItem("RememberMe");

    if (rememberMeStr)
        initialValues = JSON.parse(rememberMeStr);

    const [rememberMe, setRememberMe] = useState<boolean>(true);
    const handleRememberMeclick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setRememberMe(!rememberMe);
    }
    const validationSchema = () => {
        return Yup.object().shape({
            username: Yup.string().required(dictionaryList[locale]["RequiredField"]),
            password: Yup.string().required(dictionaryList[locale]["RequiredField"]),
        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        let pwd = Md5.init(values.password);
        login({ payload: { name: values.username, password: pwd } });

    }
    const handleOnSubmitWithDemoAccount: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        let pwdEncrypted = Md5.init("demouser");
        login({ payload: { name: 'demouser', password: pwdEncrypted } });
    }
    // login
    const [login, { isLoading, data, error }] = useUserLoginMutation();
    // Login with google
    const preLoginTracking = () => {
        console.log('Attemp to login with google');
    }
    const errorHandler = (error: string) => {
        console.error(error)
    }
    const responseGoogle = (googleUser: gapi.auth2.GoogleUser) => {
        const access_token = googleUser.getAuthResponse(true).id_token;
        fetch(appSetting.BaseUrl + "account/LoginWithGoogle?access_token=" + access_token)
            .then(response => response.json())
            .then((jsonData) => {
                if (jsonData.resultCode == ResultCode.Success) {
                    setLoggedUser(jsonData.resource);
                    window.location.href = "/";
                }
            }).catch(() => {
                console.log('Error');
            })
    }
    if (data && data.resultCode == ResultCode.Success) {
        setLoggedUser(data.resource);
        window.location.href = "/";
    }
    return (
        <>
            {isLoading && <>
                <PageLoading />
            </>}
            <div className="div-centered">
                <div className="main-content">
                    <div className="bg-white rounded shadow-7 w-400 mw-100 p-6 position-absolute top-50 start-50 translate-middle">
                        <h5 className="mb-7"><Translation tid="SigninToYourAccount" /></h5>
                        <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema} >
                            <Form autoComplete={rememberMe ? "on" : "off"}>
                                <div className="form-group">
                                    <Field type="text" className="form-control" name="username" placeholder="Username or Email" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-field alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <Field type="password" className="form-control" name="password" placeholder="Password" />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-field alert-danger"
                                    />
                                </div>

                                <div className="form-group flexbox py-3">
                                    <div className="custom-control custom-checkbox">
                                        <Field type="checkbox" className="custom-control-input" checked={rememberMe ? "checked" : ""} />
                                        <label className="custom-control-label" onClick={handleRememberMeclick} ><Translation tid="Rememberme" /></label>
                                    </div>

                                    <a className="text-muted small-2" href="/forgotPassword"><Translation tid="ForgotPassword" /></a>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-block btn-primary" type="submit" disabled={isLoading} >
                                        <Translation tid="Login" />
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                        {data && data.resultCode == ResultCode.NotExistUser.valueOf() && <>
                            <div className="alert alert-danger" role="alert">
                                <Translation tid="NotExistUser" />
                            </div>
                        </>}
                        {data && data.resultCode == ResultCode.Error.valueOf() && <>
                            <div className="alert alert-danger" role="alert">
                                <Translation tid="ErrorMsg" />
                            </div>
                        </>}
                        <div className="divider"><Translation tid="OrLoginWith" /></div>
                        <div className="form-group">
                            <button className="btn btn-block btn-primary" type="button" disabled={isLoading} onClick={handleOnSubmitWithDemoAccount} ><Translation tid="LoginWithDemoAccount" /></button>
                        </div>
                        <div className="divider"><Translation tid="OrLoginWith" /></div>
                        <div className="text-center">
                            <GoogleLoginButton
                                responseHandler={responseGoogle}
                                preLogin={preLoginTracking}
                                failureHandler={errorHandler}
                                classNames='btn btn-circle btn-sm btn-google mr-2'
                                clientConfig={{ client_id: appSetting.GoogleClientId }}
                                singInOptions={{ scope: 'profile' }}
                            >
                                <i className="fa fa-google"></i>
                            </GoogleLoginButton>
                        </div>
                        <hr className="w-30" />
                        <p className="text-center text-muted small-2">
                            <Translation tid="DontHaveAnAccount" />
                            <a href="/register"> <Translation tid="RegisterHere" /></a></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;