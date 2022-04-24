import React, { useContext } from 'react';
import { dictionaryList } from '../../locales';
import { useAppContext } from '../../contexts/appContext';

type props = {
    tid: string;
    params?: string[];
}
const StringFormat = (str: string, args: string[]) =>
    str.replace(/{(\d+)}/g, (match, index) => args[index] || '');

export const Translation: React.FC<props> = (props) => {
    const { locale } = useAppContext();
    const { tid, params } = props;
    if (params != undefined)
        return StringFormat((dictionaryList[locale][tid] || tid), params!)
    else
        return (dictionaryList[locale][tid] || tid);
};

export const PTranslation: React.FC<props> = ({ tid }) => {
    const { locale } = useAppContext();
    return <p>{dictionaryList[locale][tid] || tid}</p>
};




