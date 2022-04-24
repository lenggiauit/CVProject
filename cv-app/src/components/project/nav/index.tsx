import React from "react";
import { ProjectDetail } from "../../../services/models/projectDetail";

type Props = {
    detail: ProjectDetail
}

const LeftProjectNav: React.FC<Props> = ({ detail }) => {
    return (<>
        <div className="bg-info project-nav">
            <ul>
                <li><a href={"/projects/" + detail.id + "#dashboard"}><i className="fa fa-dashboard"></i> <div>Dashboard</div></a></li>
                <li><a href=""><i className="fa fa-sitemap"></i> <div>Backlogs</div></a></li>
                <li><a href=""><i className="fa fa-list-alt"></i> <div>Work items</div></a></li>
                <li><a href=""><i className="fa fa-list"></i> <div>Queries</div></a></li>
                <li><a href=""><i className="fa fa-calendar"></i> <div>Logwork</div></a></li>
            </ul>
        </div>
    </>)
}

export default LeftProjectNav;