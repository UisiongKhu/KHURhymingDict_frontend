import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

function PageTemplate(){
    const [t] = useTranslation();
    const navigate = useNavigate();
    return(
        <>
            <Header/>

            <div id={'Tiāⁿ ēng ê kong lêng'} className="min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element">
                <button onClick={()=>{navigate(`Lí beh ài khì ê bāng liān á`)}}>Lí beh ài khì ê só͘ chāi</button>
                <p>{t('Lí ū siat tēng ê hoan e̍k lōe iông5')}</p>
            </div>
            
            {/* Your Page Content */}
        </>
    )
}

export default PageTemplate;