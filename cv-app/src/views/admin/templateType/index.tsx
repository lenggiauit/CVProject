import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AdminLayout from '../../../components/adminLayout';
import * as bt from 'react-bootstrap';
import TemplateTypesList from '../../../components/templateType/list';


const TemplateType: React.FC = (): ReactElement => {

    return (
        <>
            <AdminLayout>
                <TemplateTypesList />
            </AdminLayout>
        </>
    );
}

export default TemplateType;