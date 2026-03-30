import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

function Registration(){
    const [t] = useTranslation();
    const navigate = useNavigate();
    return(
        <>
            <Header/>
            <div id='page-container' className="flex flex-col min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element-dark">
                <div id='login-window-container' className="flex flex-col my-5 self-center w-1/2 h-1/2 border-header dark:border-header-dark border-2 rounded-lg">
                    <p className="mt-5 font-[phiaute] text-4xl text-center">REGISTRATION</p>
                    <div className="mt-5 flex flex-row justify-center">
                        <p>E-mail</p>
                        <input id='email' className="ms-2 text-element w-1/2 dark:text-element-dark border-2 border-infobd dark:border-infobd-dark bg-main dark:bg-main-dark placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="text" placeholder={` e-mail`}/>
                    </div>
                    <div className="mt-5 flex flex-row justify-center">
                        <p>Password</p>
                        <input id='password' className="ms-2 text-element w-1/2 dark:text-element-dark border-2 border-infobd dark:border-infobd-dark bg-main dark:bg-main-dark placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="password" placeholder={` password`}/>
                    </div>
                    <div className="mt-5 flex flex-row justify-center">
                        <p>Nickname</p>
                        <input id='nickname' className="ms-2 text-element w-1/2 dark:text-element-dark border-2 border-infobd dark:border-infobd-dark bg-main dark:bg-main-dark placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="text" placeholder={` nickname`}/>
                    </div>
                    <div id='btn-container' className="flex flex-row justify-center space-x-5">
                        <button id='register-button' className='self-center my-5 rounded-s-full pt-1.5 rounded-e-full w-50 h-20 bg-interactive dark:bg-interactive-dark font-[phiaute] text-4xl hover:outline-1'>{`Register`}</button>
                        <button id='register-button' className='self-center my-5 rounded-s-full pt-1.5 rounded-e-full w-50 h-20 bg-gray-400 dark:bg-gray-600 font-[phiaute] text-4xl hover:outline-1'>{`Login`}</button>
                    </div>
                </div>
            </div>
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default Registration;