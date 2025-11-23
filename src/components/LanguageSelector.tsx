import React from "react";
import { useTranslation } from "react-i18next";


type _props = {
    className?: string;
}


function LanguageSelector(props: _props){
    const {t, i18n} = useTranslation(); 
    const handleLanguageSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLocaleCode = event.target.value;
        i18n.changeLanguage(selectedLocaleCode);
        localStorage.setItem('locale',selectedLocaleCode);
    }
    const LanguageArr = t<'Components.LanguageSelector.LanguageOptions', { returnObjects: true }, string[]>('Components.LanguageSelector.LanguageOptions', { returnObjects: true }).map(v=>v);
    const getLanguageOptionElements = ()=>{
        return LanguageArr.map(languageOption=>(
            <option key={languageOption} value={languageOption}>{t(`Components.LanguageSelector.LanguageNames.${languageOption}`)}</option>
        ))
    }
    return(
        <select className={props.className} onChange={handleLanguageSelected} value={i18n.language}>
            {getLanguageOptionElements()}
        </select>
    )
}

export default LanguageSelector;