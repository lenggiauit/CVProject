import React, { ReactElement } from 'react';
import * as bt from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Navigation from '../../components/navigation/'
import { AppProvider } from '../../contexts/appContext';
import { getLoggedUser } from '../../utils/functions';

const AdminLayout: React.FC = ({ children }): ReactElement => {

    const currentUser = getLoggedUser();

    if (currentUser == null) {
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
                            <Navigation isPublic={true} currentUser={currentUser} />
                        </bt.Row>
                    </bt.Container>
                    {children}
                </AppProvider>
            </>
        )
    }
};

export default AdminLayout;