import { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import nodokaPic from '../assets/nodoka.png';
import { useTranslation } from "react-i18next";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";
function Header(){
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);
    const [isHeaderExiting, setHeaderExiting] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const toggleMenu = ()=> {
        if(!isHeaderMenuOpen){
            setHeaderMenuOpen(true);
            setHeaderExiting(false);
        }else{
            setHeaderExiting(true);
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
                clearTimeout(timer);
            }
        }
    },[isHeaderExiting, windowSize])

    return(
        <>
            <div className='flex flex-row h-10 z-30 w-full  md:sticky md:top-0 sm:fixed sm:bottom-0 fixed bottom-0  bg-header dark:bg-header-dark text-element dark:text-element-dark justify-between'>
                <div className='relative' onMouseLeave={toggleMenu}>
                    <button type="button" className="w-8 h-10 hover:bg-header-hover dark:hover:bg-header-hover-dark p-2" onClick={toggleMenu}>
                        <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1.25rem" height="1.25rem" viewBox="0 0 24.75 24.75" xmlSpace="preserve">
                            <g>
                                    <path d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
                                            c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
                                            c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"/>
                            </g>
                        </svg>
                    </button>

                    {isHeaderMenuOpen && <SideMenu className={`${windowSize.height<=500?'h-64 max-h-64':'h-fit max-h-screen'} absolute border-infobd dark:border-infobd-dark bg-header dark:bg-header-dark text-element dark:text-element w-79 md:top-10 bottom-10 left-0 z-40 overflow-y-auto
                    ${!isHeaderMenuOpen&&!isHeaderExiting ? ' hidden':''}
                    ${isHeaderMenuOpen&&!isHeaderExiting ?' animate-fading-in':''}
                    ${isHeaderExiting ?' animate-fading-out':''}`} />
                    }
                </div>
                <img className='w-10 h-10 mr-1' src={nodokaPic}/>
                <h1 onMouseDown={()=>{navigate('/')}} className=' pl-1 pr-1 font-[phiaute] lg:text-3xl md:text-3xl sm:text-2xl text-2xl items-center mt-1 hover:bg-header-hover dark:hover:bg-header-hover-dark'>{t('Homepage.Header.Title')}</h1>
                <div className='grow'/>
                <LanguageSelector className='hover:bg-header-hover dark:hover:bg-header-hover-dark'/>
            </div>
        </>
    )
}

export default Header;