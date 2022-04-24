import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap';


const Resumes: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <bt.Container>
                    <bt.Row>
                        <h1>Resumes</h1>
                    </bt.Row>
                </bt.Container>

            </AdminLayout>

        </>
    );
}

export default Resumes;