import Header from '../components/Header';
import { Trans, useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { to10KCommaString } from '../misc/misc';

function Homepage(){     

    const [t,i18n] = useTranslation();
    const navigate = useNavigate();

    return(
        <>
            <div className='min-h-screen h-full not-dark:bg-main dark:bg-main-dark'>
                <Header/> 

                <div id='main-container' className='flex flex-col items-center h-content min-h-screen bg-main dark:bg-main-dark text-element dark:text-element-dark font-[iansui]' >
                    <h1 className='self-center mt-10 font-[phiaute] text-5xl'>{t('Homepage.Title')}</h1>
                    <div id='brief-container' className='mt-5 text-element dark:text-element-dark w-2/3 font-[iansui] text-xl text-center'>
                        <Trans i18nKey=""><p>{t('Homepage.Brief')}</p></Trans>
                    </div>
                    <div id='navigate-to-search-page-container'>
                        <button id='search-button' className='my-5 rounded-s-full pt-1.5 rounded-e-full w-50 h-20 bg-green-500 dark:bg-green-600 font-[phiaute] text-4xl hover:outline-1' onClick={()=>{navigate('/search')}}>{t('Homepage.SearchButton')}</button>
                    </div>
                    <div className='h-0.5 w-5/6 bg-element dark:bg-element-dark' />

                    <div id='info-container' className='flex flex-row flex-wrap'>
                        <div id='stat-container' className='md:w-1/2 sm:w-full p-4'>
                            <p className='my-5 font-[phiaute] text-3xl'>{t('Homepage.Stat.Title')}</p>
                            <div id='stat-data-container' className={`grid grid-cols-2 grid-rows-5 bg-header dark:bg-header-dark rounded-xl p-5 font-[phiaute] ${i18n.language==='tg_HJ'?"text-2xl":"text-3xl"}`}>
                                <p>{t('Homepage.Stat.UserVisited')}</p>
                                <p className='text-end'>{to10KCommaString(12345)}</p>
                                <p>{t('Homepage.Stat.RhymeSearched')}</p>
                                <p className='text-end'>1,2345</p>
                                <p>{t('Homepage.Stat.SyllableAmount')}</p>
                                <p className='text-end'>{to10KCommaString(5125)}</p>
                                <p>{t('Homepage.Stat.WordAmount')}</p>
                                <p className='text-end'>2134,1234</p>
                                <p>{t('Homepage.Stat.DataSourceAmount')}</p>
                                <p className='text-end'>12</p>
                            </div>
                        </div>
                        <div id='contact-info-container' className='md:w-1/2 sm:w-full p-4'>
                            <p className='my-5 font-[phiaute] text-3xl'>{t('Homepage.Contact.Title')}</p>
                                <p className='text-xl'>{t('Homepage.Contact.AuthorEmailText')}</p>
                                <p className='text-3xl underline'>uisiong.khu@gmail.com</p>
                        </div>
                        <div id='data-sources-container' className='md:w-1/2 sm:w-full p-4'>
                            <p className='my-5 font-[phiaute] text-3xl'>{t('Homepage.DataSource.Title')}</p>
                            <ul className='list-disc pl-5'>
                                <li><a href='https://github.com/ChhoeTaigi/ChhoeTaigiDatabase'><p className='text-xl underline'>{t('Homepage.DataSource.ChhoeTaigiDatabase')}</p></a></li>
                            </ul>
                        </div>
                        <div id='author-container'></div>
                    </div>
                    
                    <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
                </div>
            </div>
            
        </>
    )
}

export default Homepage;