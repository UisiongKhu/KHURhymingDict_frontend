import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { useUser } from "../contexts/User";

function Login(){
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userData = useUser();
    const handleLogin = userData.handleLogin;

    const handleLoginLocal = async () => {
        await handleLogin(email,password);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'username') {
            setEmail(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    }
    useEffect(() =>{
        const checkStatus = async() => {
            const res = await apiFetch('/user/check', {
                method: 'POST',
            });
            if(res.status === 200){
                navigate('/');
            }else if(res.status === 401){
                alert(t('UserManagement.General.SessionExpired'));
            }
        }
        checkStatus();
    },[]); // Init

    useEffect(()=>{
        if(userData.type!==-1){
            navigate('/');
        }
    },[userData]);
    return(
        <>
            <Header/>
            <div id='page-container' className="flex flex-col min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element-dark">
                <div id='login-window-container' className="flex flex-col my-5 self-center w-1/2 h-1/2 border-header dark:border-header-dark border-2 rounded-lg">
                    <p className="mt-5 font-[phiaute] text-4xl text-center">LOGIN</p>
                    <div className="mt-5 flex flex-row justify-center">
                        <p>Username</p>
                        <input id='username' className="ms-2 text-element w-1/2 dark:text-element-dark border-2 border-infobd dark:border-infobd-dark bg-main dark:bg-main-dark placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="email" placeholder={` username`} onChange={handleInputChange} />
                    </div>
                    <div className="mt-5 flex flex-row justify-center">
                        <p>Password</p>
                        <input id='password' className="ms-2 text-element w-1/2 dark:text-element-dark border-2 border-infobd dark:border-infobd-dark bg-main dark:bg-main-dark placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="password" placeholder={` password`} onChange={handleInputChange} />
                    </div>
                    <button id='login-button' className='self-center my-5 rounded-s-full pt-1.5 rounded-e-full w-50 h-20 bg-interactive dark:bg-interactive-dark font-[phiaute] text-4xl hover:outline-1' onClick={handleLoginLocal}>{`Login`}</button>
                </div>
            </div>
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default Login;