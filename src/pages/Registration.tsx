import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { validateEmail } from "../misc/misc";
import { apiFetch } from "../utils/api";

function Registration(){
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'email') {
            setEmail(value);
        } else if (id === 'password') {
            setPassword(value);
        } else if (id === 'nickname') {
            setNickname(value);
        }
    };
    const handleRegister = async () => {
        // Wait for implementation
        if(!email || !password || !nickname){
            alert(t('UserManagement.General.FillAllFields'));
            return;
        }
        if(password.length < 8){
            alert(t('UserManagement.Registration.password_length_error'));
            return;
        }
        if(!validateEmail(email)){
            alert(t('UserManagement.Registration.email_format_error'));
            return;
        }
        if(nickname.length < 2 || nickname.length > 32){
            alert(t('UserManagement.Registration.nickname_length_error'));
            return;
        }

        const res = await apiFetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                nickname,
            }),
        });
        if(res.status === 201){
            alert(t('UserManagement.Registration.registration_successful'));
            navigate('/jipcham');
        }else{
            //const data = await res.json();
            //console.error(data.message);
            alert(t('UserManagement.Registration.registration_failed'));
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            navigate('/');
        }
    },[]); // Check if already logged in, if so redirect to homepage

    return(
        <>
            <Header/>
            <div id='page-container' className="flex flex-col min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element-dark">
                <div id='login-window-container' className="flex flex-col my-5 self-center w-1/2 h-1/2 border-header dark:border-header-dark border-2 rounded-lg">
                    <p className="mt-5 font-[phiaute] text-4xl text-center">REGISTRATION</p>
                    <div className="mt-5 flex flex-row justify-center">
                        <p>E-mail</p>
                        <input id='email' className="ms-2 text-element w-1/2 dark:text-element-dark border-2 border-infobd dark:border-infobd-dark bg-main dark:bg-main-dark placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="text" placeholder={` e-mail`} value={email} onChange={handleInputChanged} />
                    </div>
                    <div className="mt-5 flex flex-row justify-center">
                        <p>Password</p>
                        <input id='password' className="ms-2 text-element w-1/2 dark:text-element-dark border-2 border-infobd dark:border-infobd-dark bg-main dark:bg-main-dark placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="password" placeholder={` password`} value={password} onChange={handleInputChanged} />
                    </div>
                    <div className="mt-5 flex flex-row justify-center">
                        <p>Nickname</p>
                        <input id='nickname' className="ms-2 text-element w-1/2 dark:text-element-dark border-2 border-infobd dark:border-infobd-dark bg-main dark:bg-main-dark placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="text" placeholder={` nickname`} value={nickname} onChange={handleInputChanged} />
                    </div>
                    <div id='btn-container' className="flex flex-row justify-center space-x-5">
                        <button id='register-button' className='self-center my-5 rounded-s-full pt-1.5 rounded-e-full w-50 h-20 bg-interactive dark:bg-interactive-dark font-[phiaute] text-4xl hover:outline-1' onClick={handleRegister}>{`Register`}</button>
                        <button id='register-button' className='self-center my-5 rounded-s-full pt-1.5 rounded-e-full w-50 h-20 bg-gray-400 dark:bg-gray-600 font-[phiaute] text-4xl hover:outline-1' onClick={() => navigate('/jipcham')}>
                            {`Login`}
                        </button>
                    </div>
                </div>
            </div>
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default Registration;