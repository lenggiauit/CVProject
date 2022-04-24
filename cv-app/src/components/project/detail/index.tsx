import React from "react";
import { useParams } from "react-router-dom";
import { ProjectDetail } from "../../../services/models/projectDetail";
import { useQuery } from "../../../utils/functions";
import ActionBar from "../actionbar";
import LeftProjectNav from "../nav";

type Props = {
    detail?: ProjectDetail
}

const ProjectDetailComponent: React.FC<Props> = ({ detail }) => {
    if (detail) {
        return (<>
            <LeftProjectNav detail={detail} />
            <div className="project-detail-container">
                <div className=" w-100">
                    <div className="row">
                        <div className="col-md-12">
                            <ActionBar detail={detail} />
                            {detail.name}
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
    else {
        return (<></>);
    }
}

export default ProjectDetailComponent;