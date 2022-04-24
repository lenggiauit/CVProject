import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./globalSpinner.css";
const GlobalSpinner: React.FC = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <>
            {
                promiseInProgress &&
                <div className="spinner">
                    <Loader type="Oval" color="#74b4ff" height="50" width="50" />
                </div>
            }
        </>
    );
}

export default GlobalSpinner;
