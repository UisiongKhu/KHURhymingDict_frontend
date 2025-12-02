import Header from '../components/Header';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { to10KCommaString } from '../misc/misc';

function Homepage(){     

    const [t,i18n] = useTranslation();
    const navigate = useNavigate();
    const isLocaleHanji = i18n.language === 'tg_HJ';

    // Chit ia̍h bô footer, in ūi footer ê mih á tī chia lóng ū khǹg.

    return(
        <>
            <div className='min-h-screen h-full not-dark:bg-main dark:bg-main-dark'>
                <Header/> 

                <div id='main-container' className='flex flex-col items-center h-content min-h-screen bg-main dark:bg-main-dark text-element dark:text-element-dark font-[iansui]' >
                    <h1 className='self-center mt-10 font-[phiaute] text-5xl'>{t('Homepage.Title')}</h1>
                    <div id='brief-container' className='mt-5 text-element dark:text-element-dark w-2/3 font-[iansui] text-xl text-center'>
                        <Trans i18nKey="Homepage.Brief"><p>{t('Homepage.Brief')}</p></Trans>
                    </div>
                    <div id='navigate-to-search-page-container'>
                        <button id='search-button' className='my-5 rounded-s-full pt-1.5 rounded-e-full w-50 h-20 bg-green-500 dark:bg-green-600 font-[phiaute] text-4xl hover:outline-1' onClick={()=>{navigate('/search')}}>{t('Homepage.SearchButton')}</button>
                    </div>
                    <div className='h-0.5 w-5/6 bg-element dark:bg-element-dark' />

                    <div id='info-container' className='flex flex-row flex-wrap'>
                        <div id='news-container' className='md:w-full sm:w-full p-4 text-xl'>
                            <p className='my-5 font-[phiaute] text-3xl'>{t('Homepage.News.Title')}</p>
                            {/* Ēng chi̍t ê div kā table pau khí lâi siat tēng rounded koh kā overflow ê pō͘ hūn chhàng khí lâi, án ne chiah ū îⁿ kak ê table */}
                            <div id='News-table-container' className='rounded-xl border-3 border-header dark:border-header-dark overflow-hidden'>
                                <table className='w-full rounded-lg'>
                                    <thead className='bg-header dark:bg-header-dark'>
                                        <th className={`w-3/4 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('Homepage.News.Table.Title')}</th>
                                        <th className={`w-1/4 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('Homepage.News.Table.Date')}</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='border-e-2 border-header dark:border-header-dark text-center ps-2'>Kin á ji̍t ài chhì giām</td>
                                            <td className='text-center'>25.12.2</td>
                                        </tr>
                                        <tr>
                                            <td className='border-e-2 border-header dark:border-header-dark text-center ps-2'>Bîn á chài mā ài chhì giām</td>
                                            <td className='text-center'>25.12.3</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                        <div id='stat-container' className='md:w-1/2 sm:w-full p-4'>
                            <p className='my-5 font-[phiaute] text-3xl'>{t('Homepage.Stat.Title')}</p>
                            <div id='stat-data-container' className={`grid grid-cols-2 grid-rows-5 bg-header dark:bg-header-dark rounded-xl p-5 font-[phiaute] ${isLocaleHanji?"text-2xl":"text-3xl"}`}>
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
                        <div id='data-sources-container' className='md:w-1/2 sm:w-full p-4'>
                            <p className='my-5 font-[phiaute] text-3xl'>{t('Homepage.DataSource.Title')}</p>
                            <ul className='list-disc pl-5'>
                                <li><a href='https://github.com/ChhoeTaigi/ChhoeTaigiDatabase'><p className='text-xl underline'>{t('Homepage.DataSource.ChhoeTaigiDatabase')}</p></a></li>
                            </ul>
                        </div>
                        <div id='author-container'></div>
                        <div id='contact-info-container' className='md:w-1/2 sm:w-full p-4'>
                            <p className='my-5 font-[phiaute] text-3xl'>{t('Homepage.Contact.Title')}</p>
                                <p className='text-xl'>{t('Homepage.Contact.AuthorEmailText')}</p>
                                <p className='text-3xl underline'>uisiong.khu@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Homepage;