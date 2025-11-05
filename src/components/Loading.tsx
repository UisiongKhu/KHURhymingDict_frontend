import { useTranslation } from "react-i18next";
import type { LoadingType } from "../types/types";

function Loading(props: LoadingType){
    const [t] = useTranslation();
    const displayText = props.text ? props.text : t('Components.Loading.DefaultText');
    // Showing a spinning loading icon.
    return <>
        <div key="loading-spinner" className={`flex flex-col items-center ${props.className}`} >
            <svg className="animate-spin" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>{displayText}</p>
        </div>
    </>;
}

export default Loading;