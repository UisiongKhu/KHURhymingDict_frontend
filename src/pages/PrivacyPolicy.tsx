import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrivacyPolicy(){
    const [t,i18n] = useTranslation();
    t;
    return(
        <>
            <Header/>
            <iframe src={`/public/PrivacyPolicy_${i18n.language}.pdf#toolbar=0`} className="w-full h-screen"/>
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
};

export default PrivacyPolicy;