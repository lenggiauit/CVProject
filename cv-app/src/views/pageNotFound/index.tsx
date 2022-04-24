import React, { ReactElement } from 'react';
import { Translation } from '../../components/translation';


const NotFoundPage: React.FC = (): ReactElement => {

    return (
        <>
            <main className="main-content text-center pb-lg-8">
                <div className="container">
                    <h1 className="display-1 text-muted mb-7"><Translation tid="page_not_found" /></h1>
                    <p className="lead"><Translation tid="page_not_found_msg" /></p>
                    <br />
                    <a className="btn btn-secondary w-200 mr-2" href="javascript:window.history.back()"><Translation tid="Goback" /></a>
                    <a className="btn btn-secondary w-200" href="/"><Translation tid="ReturnHome" /></a>
                </div>
            </main>
        </>
    );
}

export default NotFoundPage;