import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

function Contact(){
    const [t] = useTranslation();

    const styleInputArea = 'border-1 border-infobd dark:border-infobd-dark rounded-lg grow';
    const styleDataArea = 'flex md:flex-col sm:flex-col flex-col mb-1';
    const styleButton = 'p-1 mt-1 bg-interactive dark:bg-interacitve-dark hover:bg-interactive-hover dark:hover:bg-interactive-hover text-element-dark rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-offset-main dark:focus:ring-offset-main-dark focus:ring-interactive dark:focus:ring-interactive-dark';

    return(
        <>
            <Header/>

            <div id="main-container" className="min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element-dark flex flex-col items-center">
                <h1 className='mt-5 font-[phiaute] text-5xl self-center dark:text-element-dark text-element'>{t('Contact.Title')}</h1>
                <p className="mb-5 lg:text-xl md:text-xl sm:text-lg text-lg text-left lg:w-1/2 md:1/2 w-2/3">{t('Contact.Content')}</p>
                <div className="flex flex-col lg:w-2/3 w-5/6">
                    <div id="contact-form" className="font-[iansui] border-2 rounded-lg border-interactive dark:border-interactive-dark p-2 grid grid-cols-2 grid-rows-10">
                        <div className={`${styleDataArea} col-span-2 w-content mx-auto`}>
                            <h2>{t('Contact.Form.Title')}</h2>
                        </div>
                        <div className={`${styleDataArea} lg:flex-row lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2`}>
                            <label htmlFor="name">{t('Contact.Form.Name.Title')}</label>
                            <input id="name" className={`${styleInputArea} ms-1`} placeholder={t('Contact.Form.Name.Placeholder')}></input>
                        </div>
                        <div className={`${styleDataArea} lg:flex-row lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2`}>
                            <label htmlFor="email">{t('Contact.Form.Email.Title')}</label>
                            <input type="email" id="email" className={`${styleInputArea} ms-1`} placeholder={t('Contact.Form.Email.Placeholder')}></input>
                        </div>
                        <div className={`${styleDataArea} lg:flex-row col-span-2`}>
                            <label htmlFor="title">{t('Contact.Form.OpinionTitle.Title')}</label>
                            <input id="title" className={`${styleInputArea} ms-1`} placeholder={t('Contact.Form.OpinionTitle.Placeholder')}></input>
                        </div>
                        <div className={`${styleDataArea} lg:flex-col col-span-2 row-span-7`}>
                            <label htmlFor="content">{t('Contact.Form.Content.Title')}</label>
                            <textarea id="content" className={`${styleInputArea}`} placeholder={t('Contact.Form.Content.Placeholder')}></textarea>
                        </div>
                    </div>
                    <button type="submit" className={`${styleButton} ms-auto`}>{t('Contact.Submit')}</button>
                </div>
                <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
            </div>
        </>
    )
}

export default Contact;