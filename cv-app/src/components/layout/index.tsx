import React, { ReactElement } from 'react';
import * as bt from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Navigation from '../../components/navigation/'
import { AppProvider } from '../../contexts/appContext';
import { getLoggedUser } from '../../utils/functions';

type Props = {
    isPublic?: boolean,
    navCssClass?: string
}

const Layout: React.FC<Props> = ({ isPublic = false, navCssClass, children }): ReactElement => {

    const currentUser = getLoggedUser();

    if (!isPublic && currentUser == null) {
        return (
            <Redirect to='/login' />
        );
    }
    else {
        return (
            <>
                <AppProvider>
                    <bt.Container className="nav-container">
                        <bt.Row>
                            <Navigation isPublic={isPublic} currentUser={currentUser} navCssClass={navCssClass} />
                        </bt.Row>
                    </bt.Container>
                    {children}
                </AppProvider>
            </>
        )
    }
};

export default Layout;