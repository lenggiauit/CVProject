import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/layout';
import { selectUser } from "../../store/userSlice";
import { decrypt } from '../../utils/crypter';
import { getLoggedUser } from '../../utils/functions';
import * as bt from 'react-bootstrap';
import ListTeam from '../../components/team/listTeam';


const Teams: React.FC = (): ReactElement => {

    return (
        <>
            <Layout>
                <ListTeam />
            </Layout>

        </>
    );
}

export default Teams;