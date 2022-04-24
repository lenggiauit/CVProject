import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout';
import { selectUser } from "../../store/userSlice";
import { decrypt } from '../../utils/crypter';
import { getLoggedUser } from '../../utils/functions';
import * as bt from 'react-bootstrap';
import CreateTemplate from '../../components/resume/create';


const CreateResume: React.FC = (): ReactElement => {

    return (
        <>
            <Layout>
                <CreateTemplate />
            </Layout>

        </>
    );
}

export default CreateResume;