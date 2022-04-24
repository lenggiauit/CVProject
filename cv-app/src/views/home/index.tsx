import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout';
import { selectUser } from "../../store/userSlice";
import { decrypt } from '../../utils/crypter';
import { getLoggedUser } from '../../utils/functions';
import * as bt from 'react-bootstrap';
import Footer from '../../components/footer';


const Home: React.FC = (): ReactElement => {

    return (
        <>
            <Layout isPublic={true}>

                <header className="header h-fullscreen-nav-none mt-8" style={{ backgroundImage: "linear-gradient(135deg, #f9f7ff 0%, #fff 50%, #f6f3ff 100%);" }}>
                    <div className="container">
                        <div className="row align-items-center ">

                            <div className="col-lg-6">
                                <h1>Create a <span className="text-warning">professional</span><br /><span className="text-info">RESUME</span> to find your dream job.</h1>
                                <p className="lead mt-5 mb-8">Fill in the blanks, choose a template and download your resume in minutes. All free and private!</p>
                                <p className="gap-xy">
                                    <a className="btn btn-lg btn-round btn-primary" href="#">Create now</a>
                                    <a className="btn btn-lg btn-round btn-outline-secondary" href="/templates">View our templates</a>
                                </p>
                            </div>

                            <div className="col-lg-6 ml-auto d-lg-block">
                                <img src="../../assets/images/home_cv.png" alt="Create you resume" />
                            </div>

                        </div>
                    </div>
                </header>

                <div className="col-12 align-self-end text-center mt-11">
                    <a className="scroll-down-5 scroll-down-black" href="#template-content"><span></span></a>
                </div>

                <section className="section overflow-hidden" id="template-content">
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
                <div className="col-12 align-self-end text-center mt-11">
                    <a className="scroll-up-1 scroll-up-black" href="#template-content"><span></span></a>
                </div>
                <Footer />
            </Layout>

        </>
    );
}

export default Home;