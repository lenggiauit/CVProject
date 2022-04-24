import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";
const LocalSpinner: React.FC = () => {
    return (
        <div className="local-spinner">
            <Loader type="Oval" color="#74b4ff" height="20" width="20" />
        </div>
    );
}

export default LocalSpinner;
