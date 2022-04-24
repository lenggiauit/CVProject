import React from 'react'
import { AnimationLogo } from '../../components/animationLogo';
import './loading.css';
const NagistarLoading: React.FC = () => {
    return (
        <div className="page-loading-logo">
            <div className="logo">
                <AnimationLogo width={256} height={256} />
            </div>
        </div>
    )
}
export default NagistarLoading;