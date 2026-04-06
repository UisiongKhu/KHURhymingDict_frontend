import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { isLocaleHanji } from "../misc/misc";
import type { HomepageAnnouncementTitleType } from "../types/types";
import AdminAnnoucementRow from "../components/AdminAnnouncementRow";

function Administration() {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [invisible, setInvisible] = useState(false);
    const [announcementData, setAnnouncementData] = useState<HomepageAnnouncementTitleType[]>([]);
    // User Management Handlers
    // Announcement Management Handlers
    const handleAnnouncementEdit = (id: number) => {
        // Wait for implementation   
    };
    const handleAnnouncementDelete = async (id: number) => {
        // Wait for implementation
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Wait for implementation
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Wait for implementation
    };
    const handleSubmitAnnouncement = async () => {
        // Wait for implementation
    };

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
        };
        const fetchAnnouncement = async () => {
            try {
                const _announcementData = await apiFetch(`/announcement`, {
                    method: 'GET',
                }).then(res => res.json());
                setAnnouncementData(_announcementData);
                console.log('Homepage announcement data:', _announcementData);
            } catch (e) {
                console.log('Error fetching homepage announcement titles:', e);
            }
        };
        checkStatus();
        fetchAnnouncement();
    },[]); // Init
    return(
        <>
            <Header/>
            {invisible&& (
                <div id={'Tiāⁿ ēng ê kong lêng'} className="min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element-dark w-content">
                    <div className="flex flex-col">
                        <h1 className='self-center text-center pt-5 ms-5 font-[phiaute] text-4xl'>{`Iōng chiá Koán lí`}</h1>
                        
                    </div>
                    <div className=" flex flex-col items-center">
                        <h1 className='ms-5 font-[phiaute] text-4xl'>{`Siau sit Koán lí`}</h1>
                        <h2 className='w-3/4 mb-2 font-[phiaute] text-3xl'>{`Siau sit Lí su to͘h`}</h2>
                        <div id='News-table-container' className='rounded-xl border-3 border-header dark:border-header-dark overflow-hidden w-3/4'>
                            <table className='w-full rounded-lg'>
                                <thead className='bg-header dark:bg-header-dark'>
                                    <tr>
                                        <th className={`w-2/3 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('Homepage.News.Table.Title')}</th>
                                        <th className={`w-1/6 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('Homepage.News.Table.Date')}</th>
                                        <th className={`w-1/6 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{`Manipulations`}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {announcementData.length === 0 && <tr><td colSpan={3} className='text-center text-lg'>{t('Homepage.News.NoAnnouncement')}</td></tr>}
                                    {announcementData.map((announcementTitle)=>{
                                        return(<AdminAnnoucementRow key={`announcement-${announcementTitle.id}`} id={announcementTitle.id} title={announcementTitle.title} createdAt={new Date(announcementTitle.createdAt)}/>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <h2 className='w-3/4 mt-5 mb-2 font-[phiaute] text-3xl'>{`Khí sin ê Siau sit`}</h2>
                        <div id="add-news-container" className="flex flex-col w-3/4 outline-header dark:outline-header-dark outline-3 rounded-xl">
                            <div id="title-container" className="flex flex-row align-middle">
                                <h3 className="text-center pt-2 ps-2 w-1/4 text-2xl font-[phiaute] bg-header dark:bg-header-dark border-b-2 border-main dark:border-main-dark">Phiau tê</h3>
                                <input type="text" className="w-full text-lg p-2"></input>
                            </div>
                            <div id="content-container" className="flex flex-col">
                                <h3 className="text-center ps-2 py-1.5 text-2xl font-[phiaute] bg-header dark:bg-header-dark">Bûn chiuⁿ</h3>
                                <textarea className="w-full h-50 p-2"></textarea>
                            </div>
                            <div id="btn-container" className="flex flex-row justify-end">
                                <button className="mx-2 my-2 px-10 py-2 bg-interactive dark:bg-interactive-dark text-lg text-element dark:text-element-dark rounded">{`Add`}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default Administration;