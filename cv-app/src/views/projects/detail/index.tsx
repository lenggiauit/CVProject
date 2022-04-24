import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import Layout from "../../../components/layout";
import ProjectDetailComponent from "../../../components/project/detail";
import { ProjectDetail } from "../../../services/models/projectDetail";
import { useGetProjectDetailByIdMutation } from "../../../services/project";
import { ResultCode } from "../../../utils/enums";

const ProjectDetailView: React.FC = () => {
    // get project id
    const { id } = useParams<{ id: any }>();
    const [projectDetail, setProjectDetail] = useState<ProjectDetail>();
    const [GetProjectDetail, GetProjectDetailStatus] = useGetProjectDetailByIdMutation();

    useEffect(() => {
        if (id) {
            GetProjectDetail({ payload: id });
        }
    }, [])


    useEffect(() => {
        if (GetProjectDetailStatus.isSuccess && GetProjectDetailStatus.data.resultCode == ResultCode.Success) {
            let project = GetProjectDetailStatus.data.resource;
            if (project) {
                setProjectDetail(project);
            }
            else {
                <Redirect to='/404' />
            }
        }
    }, [GetProjectDetailStatus])

    if (id) {
        return (
            <>
                <Layout>
                    <ProjectDetailComponent detail={projectDetail} />
                </Layout>
            </>
        );
    }
    else {
        return (<Redirect to='/404' />)
    }
}

export default ProjectDetailView;