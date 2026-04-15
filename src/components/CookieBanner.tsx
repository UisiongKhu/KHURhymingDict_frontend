import { useTranslation } from "react-i18next";
import { usePrivacy } from "../contexts/Privacy";
import { useEffect, useState } from "react";

function CookieBanner(){
    const [t] = useTranslation();
    const privacyData = usePrivacy();
    const [mainClassname, setMainClassname] = useState("fixed bottom-20 left-1/2 right-1/2 -translate-x-1/2 w-3/4 bg-header dark:bg-header-dark rounded-xl p-4 text-element dark:text-element-dark ring-2 ring-element dark:ring-element-dark \
        flex md:flex-row flex-col justify-between opacity-95");

    useEffect(()=>{
        const t = mainClassname;
        setMainClassname(`${t} animate-ping`);
        setTimeout(()=>{},500);
        setMainClassname(t);
    },[]);

    return <> 
        {!privacyData.answered && <div id='cookie-banner' className={mainClassname}>
            <div id='cookie-banner-text-container' className="flex flex-col gap-1 mb-5 w-2/3">
                <p className="text-xl">{t('Components.CookieBanner.Title')}</p>
                <a className="text-lg underline underline-offset-2" href={`/privacy`}>{t('Components.CookieBanner.LearnMore')}</a>
            </div>
            <div id='cookie-banner-btn-container' className="md:self-center self-end grid grid-cols-2 gap-5 md:w-1/4 w-2/3 grow">
                <button className="font-[phiaute] py-2 text-2xl rounded-xl bg-interactive dark:bg-interactive-dark hover:cursor-pointer" onClick={privacyData.handleAgree}>{t('Components.CookieBanner.Agree')}</button>
                <button className="font-[phiaute] py-2 text-2xl rounded-xl border-2 border-interactive dark:border-interactive-dark hover:cursor-pointer" onClick={privacyData.handleReject}>{t('Components.CookieBanner.Reject')}</button>
            </div>
        </div>}
    </>
}

export default CookieBanner;