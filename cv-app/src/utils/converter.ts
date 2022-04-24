
import { useAppContext } from '../contexts/appContext';


function ConverterLocaleDateString(date: any) {
    const { locale } = useAppContext();
    let lang = 'en-US';
    switch (locale.toUpperCase()) {
        case "VN":
            lang = 'vi-VN';
            break;
        case "US":
            lang = 'en-US';
            break;
    }
    return (new Date(date)).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" });
}

export default ConverterLocaleDateString;