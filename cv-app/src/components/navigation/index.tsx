import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import * as bt from 'react-bootstrap';
import { Translation } from '../../components/translation/'
import { LanguageSelector } from '../languageSelector';
import { AppProvider } from '../../contexts/appContext';
import { getLoggedUser, hasPermission, hasPermissions, logout } from '../../utils/functions';
import { AnimationLogo } from '../animationLogo';
import { User } from '../../services/models/user';
import { PermissionKeys } from '../../utils/constants';
import { getSignalRHubConnection, StartSignalRHubConnection, StopSignalRHubConnection } from '../../services/chat';

type Props = {
    isPublic: boolean,
    navCssClass?: string,
    currentUser: User | null
}

const Navigation: React.FC<Props> = ({ isPublic, navCssClass, currentUser }) => {
    const location = useLocation();
    const signalRHubConnection = null;
    const [messageCount, setMessageCount] = useState<Number>(0);
    // Start onload 
     useEffect(() => {
        StartSignalRHubConnection(); 
        return () => {
            StopSignalRHubConnection();
        }
    }, []);
    useEffect(() => { 
        setTimeout(() => {
       const signalRHubConnection = getSignalRHubConnection(); 
        if (signalRHubConnection.state === 'Connected') {
            const currentUser = getLoggedUser();
            if(currentUser !=null){
                signalRHubConnection.send("checkNewMessages", currentUser.id);
                console.log("checkNewMessages");
            }
            signalRHubConnection.on("onHaveNewMessages", (count) => {
                setMessageCount(count);
                console.log(count);
            });
        } }, 1000);

        
    }, [signalRHubConnection]);
    return (
        <>
            <nav className={"navbar navbar-expand-lg navbar-dark " + (navCssClass ? navCssClass : "")}>
                <div className="container">

                    <div className="navbar-left mr-4">
                        <button className="navbar-toggler" type="button"><span className="navbar-toggler-icon"></span></button>
                        <a className="navbar-brand" href="/">
                            <AnimationLogo width={45} height={45} />
                        </a>
                    </div>
                    <section className="navbar-mobile">
                        <span className="navbar-divider d-mobile-none"></span>
                        <ul className="nav nav-navbar nav-text-normal mr-auto">
                            <li className="nav-item">
                                <a className={`nav-link ${(location.pathname == '/') ? "active" : ""}`} href="/"><Translation tid="nav_home" /></a>
                            </li>
                            {currentUser != null && <>
                                <li className="nav-item">
                                    <a className={`nav-link ${(location.pathname.indexOf('resume') != -1) ? "active" : ""}`} href="#"><Translation tid="nav_resume" /><span className="arrow"></span></a>
                                    <nav className="nav">
                                        <a className="nav-link" href="/yourresume"><Translation tid="nav_yourResume" /></a>
                                        <a className="nav-link" href="/createresume"><Translation tid="nav_createResume" /></a>
                                    </nav>
                                </li>
                            </>
                            }
                            {currentUser != null
                                && (hasPermissions([PermissionKeys.CreateTemplateType, PermissionKeys.GetTemplate, PermissionKeys.GetTemplateType, PermissionKeys.UploadTemplate]))
                                && <>
                                    <li className="nav-item">
                                        <a className={`nav-link ${(location.pathname.indexOf('admin') != -1) ? "active" : ""}`} href="#"><Translation tid="nav_admin" /><span className="arrow"></span></a>
                                        <nav className="nav">
                                            <a className="nav-link" href="/admin/templatetype">Template Type</a>
                                            <a className="nav-link" href="/admin/template">Template</a>
                                            <a className="nav-link" href="/admin/resumes">Resumes</a>
                                        </nav>
                                    </li>
                                </>
                            }
                            {currentUser != null && <>
                                <li className="nav-item">
                                    <a className={`nav-link ${(location.pathname.indexOf('messages') != -1) ? "active" : ""}`} href="/messages"><Translation tid="nav_messages" />{messageCount == 0 ? "" : <span className='text-danger'>({ messageCount})</span> }</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${(location.pathname.indexOf('profile') != -1) ? "active" : ""}`} href="/profile"><Translation tid="nav_profile" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={() => logout()}><Translation tid="nav_logout" /></a>
                                </li>
                            </>
                            }
                            
                        </ul>
                        <div>
                           
                            <a className="btn btn-sm btn-success" href="#">Donate</a>
                            <span className="navbar-divider d-mobile-none"></span>
                            {isPublic && currentUser == null && <> 
                            <a className="btn btn-sm btn-success" href="/login"><Translation tid="nav_login" /></a> 
                            <span className="navbar-divider d-mobile-none"></span>
                            </>}
                        </div>
                        <LanguageSelector />
                    </section>

                </div>
            </nav>
        </>
    )
};

export default Navigation;