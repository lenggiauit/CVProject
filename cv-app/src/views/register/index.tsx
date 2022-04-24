import React, { ReactElement, useState } from 'react';
import { Translation } from '../../components/translation';
import { Form, Field, Formik, FormikHelpers, ErrorMessage, } from 'formik';
import * as Yup from "yup";
import { useAppContext } from '../../contexts/appContext';
import { dictionaryList } from '../../locales';
import { useUserRegisterMutation } from '../../services/account';
import PageLoading from '../../components/pageLoading';
import TermOfService from '../termsOfService';
import { Md5 } from "md5-typescript";
import { GoogleLoginButton } from 'ts-react-google-login-component';
import { ResultCode } from '../../utils/enums';
import { AppSetting } from '../../types/type';

let appSetting: AppSetting = require('../../appSetting.json');

interface FormValues {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

const Register: React.FC = (): ReactElement => {
    const { locale } = useAppContext();
    let initialValues: FormValues = { userName: '', email: '', password: '', confirmPassword: '', acceptTerms: false };
    const [agreeTemmsOfService, setAgreeTemmsOfService] = useState<boolean>(false);
    const [isSubmited, setIsSubmited] = useState<boolean>(false);
    const handleAgreeTemmsOfServiceclick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
        setAgreeTemmsOfService(!agreeTemmsOfService);
    }
    const [register, { isLoading, data, error }] = useUserRegisterMutation();
    const validationSchema = () => {
        return Yup.object().shape({
            userName: Yup.string().required(dictionaryList[locale]["RequiredField"])
                .test("UserNameAlreadyRegistered", dictionaryList[locale]["UserNameAlreadyRegistered"], (userName) => {
                    if (userName) {
                        return new Promise((resolve, reject) => {
                            fetch(appSetting.BaseUrl + "account/checkusername?name=" + userName)
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
            email: Yup.string()
                .required(dictionaryList[locale]["RequiredField"])
                .email("Email is invalid!")
                .test("EmailAlreadyRegistered", dictionaryList[locale]["EmailAlreadyRegistered"], (email) => {
                    if (email) {
                        return new Promise((resolve, reject) => {
                            fetch(appSetting.BaseUrl + "account/checkemail?email=" + email)
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
            password: Yup.string().required(dictionaryList[locale]["RequiredField"]).min(8, dictionaryList[locale]["PasswordsLengthRule"]),
            confirmPassword: Yup.string().required(dictionaryList[locale]["RequiredField"])
                .oneOf([Yup.ref('password'), null], dictionaryList[locale]["PasswordsMustMatch"]),
            acceptTerms: Yup.boolean().oneOf([true, false], dictionaryList[locale]["MustAgreeTermsOfService"])
        });
    }
    const handleOnSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        let pwd = Md5.init(values.password);
        register({ payload: { userName: values.userName, email: values.email, password: pwd } });
    }

    const [isModalOpen, setIsOpenModal] = React.useState(false);
    // Goooglge
    const preLoginTracking = () => {
        console.log('Attemp to login with google');
    }

    const errorHandler = (error: string) => {
        console.error(error)
    }

    const responseGoogle = (googleUser: gapi.auth2.GoogleUser) => {
        const access_token = googleUser.getAuthResponse(true).id_token;
        fetch(appSetting.BaseUrl + "account/RegisterWithGoogle?access_token=" + access_token)
            .then(response => response.json())
            .then((json) => {
                if (json.resultCode == ResultCode.RegisterExistEmail) {
                    alert(dictionaryList[locale]["EmailAlreadyRegistered"]);
                }
                else {
                    alert(dictionaryList[locale]["RegisterSuccess"]);
                    window.location.href = "/login";
                }
            }).catch(() => {
                console.log('Error');
            })
    }

    if (data && data.resultCode == ResultCode.Success) {
        return (<>
            <div className="div-centered">
                <div className="main-content">
                    <div className="bg-white rounded shadow-7 w-500 mw-100 p-6 position-absolute top-50 start-50 translate-middle">
                        <h5 className="mb-7"><Translation tid="RegisterSuccess" /></h5>
                        <p><Translation tid="RegisterSuccessMsg" /> <a href="/login"> <Translation tid="LoginHere" /></a></p>
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
                            <h5 className="mb-7"><Translation tid="CreateAnAccount" /></h5>
                            <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema} validateOnChange={false}  >
                                {({ errors, touched }) => (
                                    <Form autoComplete="off">
                                        <div className="form-group">
                                            <Field type="text" className="form-control" name="userName" placeholder="Username" />
                                            <ErrorMessage
                                                name="userName"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Field type="text" className="form-control" name="email" placeholder="Email" />
                                            <ErrorMessage
                                                name="email"
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
                                        <div className="form-group">
                                            <Field type="password" className="form-control" name="confirmPassword" placeholder="Confirm password" />
                                            <ErrorMessage
                                                name="confirmPassword"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group py-3">
                                            <div className="custom-control custom-checkbox">
                                                <Field type="checkbox" className="custom-control-input" name="acceptTerms" checked={agreeTemmsOfService ? "checked" : ""} />
                                                <label className="custom-control-label" onClick={handleAgreeTemmsOfServiceclick} ><Translation tid="IAgreeToThe" />
                                                    <a href="#" onClick={() => { setIsOpenModal(true) }} className="ml-1" data-toggle="modal" data-target="#modal-large"><Translation tid="TermsOfService" /></a>
                                                </label>
                                            </div>
                                            <ErrorMessage
                                                name="acceptTerms"
                                                component="div"
                                                className="alert alert-field alert-danger"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-block btn-primary" type="submit" disabled={isLoading} >
                                                <Translation tid="SignUp" />
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            {data && data.resultCode == ResultCode.RegisterExistEmail.valueOf() && <>
                                <div className="alert alert-danger" role="alert">
                                    <Translation tid="EmailAlreadyRegistered" />
                                </div>
                            </>}
                            {data && data.resultCode == ResultCode.RegisterExistUserName.valueOf() && <>
                                <div className="alert alert-danger" role="alert">
                                    <Translation tid="UserNameAlreadyRegistered" />
                                </div>
                            </>}
                            <div className="divider"><Translation tid="OrRegisterWith" /></div>
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
                            <hr className="w-50" />
                            <p className="text-center text-muted small-2"><Translation tid="AlreadyAMember" />
                                <a href="/login">  <Translation tid="LoginHere" /></a></p>
                        </div>
                    </div>
                </div>

                <div className={isModalOpen ? "modal fade show" : "modal fade"} id="modal-large" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { setIsOpenModal(false) }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <TermOfService />
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Register;