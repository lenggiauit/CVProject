import React from "react";
import { ProjectDetail } from "../../../services/models/projectDetail";

type Props = {
    detail: ProjectDetail
}

const ActionBar: React.FC<Props> = ({ detail }) => {
    return (<>
        <div className="btn-toolbar mt-2" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group">
                <button type="button" className="btn btn-secondary">{detail.name}</button>
            </div>
            <div className="btn-group mr-2" role="group">

                <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Board
                </button>
                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a className="dropdown-item" href="#">Board</a>
                    <a className="dropdown-item" href="#">Timeline</a>
                </div>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary">Team</button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary">Invite</button>
            </div>
        </div>
    </>)
}

export default ActionBar;