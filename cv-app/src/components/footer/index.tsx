import React, { ReactElement } from 'react';
import * as bt from 'react-bootstrap';
import Navigation from '../../components/navigation/'
import { AppProvider } from '../../contexts/appContext';

const Footer: React.FC = ({ children }): ReactElement => {


    return (
        <>
            <AppProvider>
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-lg-8 mx-auto">

                                <div className="nav nav-bold nav-uppercase nav-center">
                                    <a className="nav-link" href="https://nagistar.com/ourworkprocess">Our Work Process</a>
                                    <a className="nav-link" href="https://nagistar.com/ourMissionAndValues">Our mission & Values</a>
                                    <a className="nav-link" href="https://nagistar.com/ourservices">Our Services</a>
                                    <a className="nav-link" href="https://nagistar.com/contact-us">Contact</a>
                                </div>

                                <hr />

                                <p className="text-center">Nagistar is a software development company. We have a talented team with many years of experience working in information technology, who will work together with your organization to understand, consult and digitalize your complex business process.</p>

                            </div>
                        </div>
                    </div>
                </footer>
                {children}
            </AppProvider>
        </>
    )

};

export default Footer;



