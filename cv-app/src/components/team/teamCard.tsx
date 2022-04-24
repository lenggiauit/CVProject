import React from "react";
import internal from "stream";

type Props = {
    id: any,
    name: any,
    members: number,
    description: any,

}


const TeamCard: React.FC = () => {

    return (<>
        <div className="col-6 col-lg-3">
            <a className="card shadow-1 hover-shadow-6" href="#" data-toggle="modal"  >

                <div className="card-body team-container team-type ">
                    <span className="team-type-tag po">PO</span>
                    <h6 className="mb-0">Team PO 1</h6>
                    <div>
                        <small className="small-4 text-uppercase ls-2">Team project</small>
                    </div>
                    <div>
                        <small className="small-4 text-uppercase ls-2">12</small>
                    </div>
                </div>
            </a>
        </div>
    </>)
}

export default TeamCard;