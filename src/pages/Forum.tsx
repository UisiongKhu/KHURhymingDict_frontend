//import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
//import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import TopicCard from "../components/TopicCard";
import { useTranslation } from "react-i18next";


function Forum(){
    const [t] = useTranslation();
    //const navigate = useNavigate();
    return(
        <>
            <Header/>

            <div id="main-container" className="min-h-screen flex flex-col items-center bg-main dark:bg-main-dark text-element dark:text-element-dark">
                <h1 className="pt-5 font-[phiaute] text-5xl text-center">{t('Forum.Title')}</h1>
                <p className="lg:text-xl md:text-xl sm:text-lg text-lg text-left">{t('Forum.Content')}</p>
                <div id="searchbar-container" className="flex flex-col mt-5 w-full">
                    <SearchBar label={t('SearchBar.Forum.Label')} placeholder={t('SearchBar.Forum.Placeholder')} />
                </div>
                <div id="topic-container">
                    <TopicCard title='Test' content='Mài khuh chhì im, chhì im~' author='Ushi' likesAmount={214} commentsAmount={12} pined={false} createAt={new Date(Date.now())} liked={true} />
                </div>
            </div> 
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default Forum;