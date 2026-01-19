import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import type { Announcement } from "../types/types";
import { useEffect, useState } from "react";

function AnnouncementDetail(){
    const { id } = useParams<{id:string}>();
    const [t, i18n] = useTranslation();
    const [announcementData, setAnnouncementData] = useState<Announcement>();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [isAnnouncementNotFound, setAnnouncementNotFound] = useState<boolean>(false);
    const navigate = useNavigate();

    // 判斷語言是否為英文或白話字 (tg_POJ)
    const isFontPhiaute = i18n.language === 'en' || i18n.language === 'tg_POJ';

    useEffect(()=>{
        const fetchAnnouncementDetail = async () => {
            try {
                const result = await fetch(`${apiUrl}/announcement/${id}`, {
                    method: 'GET',
                });
                const data = await result.json();
                if(result.status === 404){
                    setAnnouncementNotFound(true);
                    return;
                }
                if(data === null || data === undefined){
                    setAnnouncementNotFound(true);
                    return;
                }
                setAnnouncementData({
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    createdAt: new Date(data.createdAt),
                    updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
                });
            } catch (e) {
                console.log('Error fetching announcement detail:', e);
                setAnnouncementNotFound(true);
            }
        };
        fetchAnnouncementDetail();
    },[])

    useEffect(()=>{},[isAnnouncementNotFound]);


    return(
        <>
            <Header/>

            <div className="min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element-dark">
            {announcementData?.title !== undefined && (<div className="container mx-auto px-4 py-8 max-w-4xl">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center text-element dark:text-element-dark hover:text-gray-500 dark:hover:text-gray-400 mb-6"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        {t("Announcement.Exit")}
                    </button>

                    <h1 className={`text-4xl mb-4 ${isFontPhiaute ? 'font-[phiaute]' : ''}`}>
                        {announcementData?.title}
                    </h1>

                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 border-b border-infobd dark:border-infobd-dark pb-3">
                        {t("Announcement.Published")}: {announcementData?.createdAt && `${announcementData.createdAt.getFullYear()}.${announcementData?.createdAt.getMonth() + 1}.${announcementData?.createdAt.getDate()} ${announcementData?.createdAt.getHours()}:${announcementData?.createdAt.getMinutes().toString().padStart(2, '0')}`}
                        {announcementData?.updatedAt && announcementData.updatedAt.getTime() !== announcementData.createdAt.getTime() && (
                            <span className="ml-4">
                                ({t("Announcement.LastUpdated")}: {announcementData?.updatedAt && `${announcementData.updatedAt.getFullYear()}.${announcementData.updatedAt.getMonth() + 1}.${announcementData.updatedAt.getDate()} ${announcementData.updatedAt.getHours()}:${announcementData.updatedAt.getMinutes().toString().padStart(2, '0')}`})
                            </span>
                        )}
                    </div>

                    <div className="text-xl leading-relaxed whitespace-pre-line">
                        {announcementData?.content}
                    </div>
            </div>)}
            {announcementData?.title === undefined && isAnnouncementNotFound && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <svg 
                        className="w-20 h-20 mb-6 text-red-500 opacity-80" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="1.5" 
                            d="M15 9l-6 6m0-6l6 6" 
                        />
                    </svg>

                    <h2 className="text-2xl font-[phiaute] mb-2">
                        {t("Announcement.NotFound.Title")}
                    </h2>
                    
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                        {t("Announcement.NotFound.Brief")}
                    </p>

                    <button 
                        onClick={() => navigate('-1')}
                        className="px-6 py-2 rounded-full border border-element dark:border-element-dark hover:bg-element hover:text-main dark:hover:bg-element-dark dark:hover:text-main-dark transition-colors duration-200"
                    >
                        {t("Announcement.BackToList")}
                    </button>
                </div>
            )}
            </div>
            
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default AnnouncementDetail;