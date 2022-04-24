import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout';
import { selectUser } from "../../store/userSlice";
import { decrypt } from '../../utils/crypter';
import { getLoggedUser } from '../../utils/functions';
import * as bt from 'react-bootstrap';


const Templates: React.FC = (): ReactElement => {

    return (
        <>
            <Layout isPublic={true}>
                <section className="section overflow-hidden">
                    <div className="container">
                        <header className="section-header">
                            <h2>Templates</h2>
                            <hr />
                        </header>

                        <div className="container">
                            <div className="row gap-y gap-2 shuffle align-items-center">

                                <div className="col-md-6 text-center text-md-right">
                                    <p className="small-2 text-uppercase text-lightest fw-500 ls-1">Canada</p>
                                    <h3 className="fw-500">Canadian style</h3>
                                    <br />
                                    <p>Instrument cultivated alteration any favourable expression law far nor. Both new like tore but year. An from mean on with when sing pain. Oh to as principles devonshire companions unsatiable an delightful. The ourselves suffering the sincerity. Inhabit her manners adapted age certain. Debating offended at branched striking be subjects.</p>
                                </div>

                                <div className="col-md-6">
                                    <img src="../../assets/images/templates/template_1.jpg" alt="Template" />
                                </div>

                            </div>
                        </div>

                        <div className="container mt-10">
                            <div className="row gap-y gap-2 shuffle align-items-center">
                                <div className="col-md-6">
                                    <img src="../../assets/images/templates/template_2.jpg" alt="Template" />
                                </div>
                                <div className="col-md-6 text-center text-md-left">
                                    <p className="small-2 text-uppercase text-lightest fw-500 ls-1">Vietnamese</p>
                                    <h3 className="fw-500">Vietnamese style</h3>
                                    <br />
                                    <p>Instrument cultivated alteration any favourable expression law far nor. Both new like tore but year. An from mean on with when sing pain. Oh to as principles devonshire companions unsatiable an delightful. The ourselves suffering the sincerity. Inhabit her manners adapted age certain. Debating offended at branched striking be subjects.</p>
                                </div>



                            </div>
                        </div>



                    </div>
                </section>







            </Layout>

        </>
    );
}

export default Templates;