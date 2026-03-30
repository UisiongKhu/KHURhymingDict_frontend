import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

function Administration() {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [invisible, setInvisible] = useState(false);
    useEffect(() =>{
        const checkStatus = async() => {
            if(!localStorage.getItem('token')){
                navigate('/jipcham');
                return;
            }
            const res = await apiFetch('/user/check', {
                method: 'POST', // Check if user is an admin
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'admin' }),
            });
            if(res.status === 200){
                setInvisible(true);
                console.log(await res.json());
            }else{
                navigate('/jipcham');
            }
        }
        checkStatus();
    },[]); // Init
    return(
        <>
            <Header/>
            {invisible&& (
                <div id={'Tiāⁿ ēng ê kong lêng'} className="min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element-dark">
                    <button onClick={()=>{navigate(`Lí beh ài khì ê bāng liān á`)}}>Lí beh ài khì ê só͘ chāi</button>
                    <p>{t('You already logged in as a administrator.')}</p>
                </div>
            )}
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default Administration;