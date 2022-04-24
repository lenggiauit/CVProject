import React from 'react'
import './loading.css';
import Loader from 'react-loader-spinner';
const PageLoading: React.FC = () => {
    return (
        <div className="page-loading-logo">
            <div className="logo">
                <Loader type="Oval" color="#74b4ff" height="50" width="50" />
            </div>
        </div>
    )
}

export default PageLoading;