import React, { useEffect, useState } from "react";
import { Translation } from "../translation";
import { useGetProjectListByUserMutation } from "../../services/project";
import { AppSetting, MetaData, Paging } from "../../types/type";
import Pagination from "../pagination";
import { Project } from "../../services/models/project";
import ProjectItem from "./item";
import { v4 } from "uuid";
import PageLoading from "../pageLoading";
import LocalSpinner from "../localSpinner";
import AddProjectButton from "./add";
import { hasPermission } from "../../utils/functions";
const appSetting: AppSetting = require('../../appSetting.json');

const ProjectList: React.FC = () => {

    // get team list
    const [getProjectList, getProjectListStatus] = useGetProjectListByUserMutation();
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [isArchived, setIsArchived] = useState<boolean>(false);
    const [projectList, setProjectList] = useState<Project[]>([]);
    const pagingChangeEvent: any = (p: Paging) => {

        let mp: Paging = {
            index: p.index,
            size: p.size
        }
        setPagingData(mp);
    }
    useEffect(() => {
        let md: MetaData = {
            paging: pagingData
        }
        setMetaData(md);
    }, [pagingData]);


    useEffect(() => {
        getProjectList({ payload: { isArchived: isArchived }, metaData: metaData });
    }, [metaData, isArchived]);

    useEffect(() => {
        if (getProjectListStatus.isSuccess && getProjectListStatus.data.resource != null) {
            let listproject = getProjectListStatus.data.resource;
            if (listproject.length > 0) {
                setTotalRows(listproject[0].totalRows);
            }
            else {
                setTotalRows(0);
            }
            setProjectList(listproject);
        }
    }, [getProjectListStatus]);

    return (<>
        {getProjectListStatus.isLoading && <PageLoading />}
        <section className="section overflow-hidden bg-gray">
            <div className="container">
                <header className="section-header mb-0">
                    <h2><Translation tid="ProjectList" /></h2>
                    <hr />
                </header>

                <div data-provide="shuffle">
                    <ul className="nav nav-center nav-bold nav-uppercase nav-pills mb-7 mt-0" data-shuffle="filter">
                        <li className="nav-item">
                            <a className={"nav-link " + (!isArchived ? "active" : "")} href="#" data-shuffle="button" onClick={() => { setIsArchived(false) }}><Translation tid="all" /></a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link " + (isArchived ? "active" : "")} href="#" data-shuffle="button" onClick={() => { setIsArchived(true) }} data-group="bag"><Translation tid="archived" /></a>
                        </li>
                    </ul>
                    <div className="row gap-y gap-2" data-shuffle="list">
                        {!isArchived && hasPermission("AddNewProject") && <AddProjectButton />}
                        {projectList.map(p => <ProjectItem key={v4().toString()} project={p} />)}
                    </div>

                    <div className="mt-7">
                        <Pagination totalRows={totalRows} pageChangeEvent={pagingChangeEvent} />
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default ProjectList;

