import React, { useState, createContext, useContext } from 'react';
import { AppSetting } from '../types/type';

let appSetting: AppSetting = require('../appSetting.json');

export type AppContextType = {
    locale: string;
    setLocale: (string: string) => void;
    appSetting: AppSetting;
}

export const AppContext = createContext<AppContextType>({
    locale: 'en',
    setLocale: locale => console.warn('No locale provider'),
    appSetting: appSetting
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC = ({ children }) => {
    const defaultLocale = window.localStorage.getItem('covid-19-tracking-lang');
    const [locale, setLocale] = useState<string>(defaultLocale || 'en');

    const provider = {
        locale,
        setLocale,
        appSetting
    };
    return (
        <>
            <AppContext.Provider value={provider}>
                {children}
            </AppContext.Provider>
        </>
    );
};



