import { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User";
function Header(){
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);
    const [isHeaderExiting, setHeaderExiting] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const userData = useUser();
    const isAdmin = userData.type === 1;
    const loggedIn = userData.type !== -1;
    const userNickname = userData.nickname;
    const toggleMenu = ()=> {
        if(!isHeaderMenuOpen){
            setHeaderMenuOpen(true);
            setHeaderExiting(false);
        }else{
            setHeaderExiting(true);
        }
    }
    const handleLogout = async () => {
        try {
            const logoutState = await userData.handleLogout();
            if(logoutState!){
                navigate('/'); // Redirect to homepage after logout
                alert('Logout successful');
            }
        } catch (e) {
            console.error('Error logging out:', e);
        }
    }

    useEffect(()=>{
        let timer: ReturnType<typeof setTimeout>;
        
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize);

        if(isHeaderExiting){
            timer = setTimeout(()=>{setHeaderMenuOpen(false);setHeaderExiting(false);},200); 
        }
        return ()=>{
            if(timer){
                window.removeEventListener('resize', handleResize);
                clearTimeout(timer);
            }
        }
    },[isHeaderExiting])

    useEffect(()=>{},[userData, isAdmin, loggedIn]);

    return(
        <>
            <div className='flex flex-row h-10 z-30 w-full  md:sticky md:top-0 sm:fixed sm:bottom-0 fixed bottom-0  bg-header dark:bg-header-dark text-element dark:text-element-dark justify-between'>
                <div className='relative' onMouseLeave={toggleMenu}>
                    <button type="button" className="w-8 h-10 hover:bg-header-hover dark:hover:bg-header-hover-dark p-2 hover:cursor-pointer" onClick={toggleMenu}>
                        <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1.25rem" height="1.25rem" viewBox="0 0 24.75 24.75" xmlSpace="preserve">
                            <g>
                                    <path d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
                                            c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
                                            c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"/>
                            </g>
                        </svg>
                    </button>

                    {isHeaderMenuOpen && <SideMenu isAdmin={isAdmin} className={`${windowSize.height<=500?'h-64 max-h-64':'h-fit max-h-screen'} absolute border-infobd dark:border-infobd-dark bg-header dark:bg-header-dark text-element dark:text-element w-79 md:top-10 bottom-10 left-0 z-40 overflow-y-auto
                    ${!isHeaderMenuOpen&&!isHeaderExiting ? ' hidden':''}
                    ${isHeaderMenuOpen&&!isHeaderExiting ?' animate-fading-in':''}
                    ${isHeaderExiting ?' animate-fading-out':''}`} />
                    }
                </div>
                {/*<img className='w-10 h-10 mr-1' src={nodokaPic}/>*/}
                <h1 onMouseDown={()=>{navigate('/')}} className='hover:cursor-pointer pl-1 pr-1 font-[phiaute] lg:text-3xl md:text-3xl sm:text-2xl text-2xl items-center mt-1 hover:bg-header-hover dark:hover:bg-header-hover-dark'>{t('Homepage.Header.Title')}</h1>
                <div className='grow'/>
                {loggedIn &&(
                    <>
                        <div id='user-nick-name-container' className='flex flex-row items-center mr-2'>
                            <p className='text-md'>{userNickname}</p>
                        </div>
                        <div id='logout-btn' className='hover:cursor-pointer hover:bg-header-hover dark:hover:bg-header-hover-dark border-infobd dark:border-infobd-dark p-2' onClick={handleLogout}>
                            Logout
                        </div>
                    </>
                )}
                <LanguageSelector className='hover:cursor-pointer hover:bg-header-hover dark:hover:bg-header-hover-dark'/>
            </div>
        </>
    )
}

export default Header;