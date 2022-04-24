import React from "react";

const AddNewTeamCard: React.FC = () => {

    return (<>
        <div className="col-6 col-lg-3">
            <a className="card shadow-1 hover-shadow-6" href="#" data-toggle="modal">
                <div className="card-body team-container">
                    <h6 className="mb-0">Add</h6>
                </div>
            </a>
        </div>
    </>);
}

export default AddNewTeamCard;