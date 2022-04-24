import React, { useEffect } from "react";
import { useGetTeamListMutation } from "../../services/team";
import { Translation } from "../translation";
import AddNewTeamCard from "./addTeamCard";
import TeamCard from "./teamCard";

const ListTeam: React.FC = () => {

    // get team list
    const [GetTeamList, { isLoading, data, error }] = useGetTeamListMutation();
    useEffect(() => {
        GetTeamList({ payload: { userId: '' } });

    }, [])


    return (<>
        <section className="section overflow-hidden bg-gray">
            <div className="container">
                <header className="section-header">
                    <h2><Translation tid="TeamsList" /></h2>
                    <hr />
                </header>

                <div data-provide="shuffle">
                    <ul className="nav nav-center nav-bold nav-uppercase nav-pills mb-7" data-shuffle="filter">
                        <li className="nav-item">
                            <a className="nav-link active" href="#" data-shuffle="button">All</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" data-shuffle="button" data-group="bag">Your Team</a>
                        </li>
                    </ul>


                    <div className="row gap-y gap-2" data-shuffle="list">

                        <AddNewTeamCard />
                        <TeamCard />

                    </div>
                </div>


            </div>
        </section>
    </>)
}

export default ListTeam;