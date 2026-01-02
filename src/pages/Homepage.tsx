import Header from '../components/Header';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { to10KCommaString } from '../misc/misc';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import Checkbox from '../components/Checkbox';
import { Tooltip } from 'react-tooltip';

function Homepage(){     

    const [t,i18n] = useTranslation();
    const navigate = useNavigate();
    const isLocaleHanji = i18n.language === 'tg_HJ';
    const [getSearchBarInput, setSearchBarInput] = useState("");
    const [optionsVisible, setOptionsVisible] = useState(true);
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const OptionsStringArray = t<'SearchBar.Homepage.Dropdown.Options', { returnObjects: true }, string[]>('SearchBar.Homepage.Dropdown.Options', { returnObjects: true }).map(v=>v);
    const handleSearchBarInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBarInput(event.target.value);
    }

    const getSearchBarDropdownOptions = () =>{
        return OptionsStringArray.map(optionStr => Object({value: OptionsStringArray.indexOf(optionStr)+1, text: optionStr})
        );
    }
    const handleOptionVisible = () => {
        setOptionsVisible(!optionsVisible);
    }
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


                    <div id='info-container' className='flex flex-row flex-wrap w-4/5'>
                        <div id='tutorial-container' className='flex flex-col flex-wrap w-full p-4 mt-10 mb-5'>
                            <p className='font-[phiaute] text-3xl text-left'>{t('Homepage.Tutorial.Title')}</p>
                            <p className='font-[iansui] text-xl text-left'>{t('Homepage.Tutorial.Brief')}</p>
                            <div id='tutorial-ui-container' className="flex flex-col justify-center border-2 border-infobd dark:border-infobd-dark rounded-lg p-5 mt-5 w-1/2 self-center">
                                    <SearchBar id='tutorial-searchbar' className="w-full px-5 self-center tutorial-searchbar" label={t('SearchBar.SimpleSearch.Label')} input={getSearchBarInput} inputFunc={handleSearchBarInput} placeholder={t('SearchBar.SimpleSearch.Placeholder')} options={getSearchBarDropdownOptions()} onClick={()=>{return}} />

                                    <div id="option-container" className={`font-[iansui] self-center mt-2 p-2 lg:w-1/2 md:w-2/3 sm:w-2/3 w-4/5 rounded-lg border-2 border-infobd dark:border-infobd-dark 
                                        transition-all duration-200 ease-out transform origin-top
                                        ${(optionsVisible)?'max-h-fit':''}
                                        ${!optionsVisible?'max-h-15 overflow-hidden':''}
                                        `}>
                                        <div id="option-title-container" className="flex flex-row justify-between">
                                            <h1 className="text-lg text-left mb-1">{t('Search.SimpleSearch.SearchOption.Title')}</h1>
                                            <button type="button" onClick={handleOptionVisible}>
                                                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="currentColor" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div id="option-content-container" className={`grid grid-cols-2 gap-2 text-left text-md 
                                            transition-all duration-200 ease-out transform origin-top
                                            ${optionsVisible?'opacity-100 scale-y-100 visible':''}
                                            ${!optionsVisible?'opacity-0 scale-y-0 invisible':''}
                                        `}>
                                            <h2>{t('Search.SimpleSearch.SearchOption.SubTitle.Nucleus')}</h2><br/>
                                                <Checkbox checkboxId="cbIgnoreNasalSound" label={t('Search.SimpleSearch.SearchOption.NasalSound')} />
                                                <Checkbox checkboxId="cbSimilarVowel" label={t('Search.SimpleSearch.SearchOption.SimilarVowel')} />
                                            <h2>{t('Search.SimpleSearch.SearchOption.SubTitle.Coda')}</h2><br/>
                                                <Checkbox checkboxId="cbIgnoreFinalSound" label={t('Search.SimpleSearch.SearchOption.IgnoreFinalSound')} />
                                                <Checkbox checkboxId="cbSameArticulationPart" label={t('Search.SimpleSearch.SearchOption.SameArticulationPart')}/>
                                            <h2>{t('Search.SimpleSearch.SearchOption.SubTitle.Tone')}</h2><br/>
                                                <Checkbox checkboxId="cbSameTone" label={t('Search.SimpleSearch.SearchOption.SameTone')} />
                                        </div>
                                        <Tooltip anchorSelect='.tutorial-searchbar' place='left' className={isDarkMode?'tooltip-dark':'tooltip'} classNameArrow={isDarkMode?`tooltip-arrow-dark`:`tooltip-arrow`}>{t('Homepage.Tutorial.Tooltip.SearchBar')}</Tooltip>
                                        <Tooltip id="cbIgnoreNasalSound" place='left' className={isDarkMode?'tooltip-dark':'tooltip'} classNameArrow={isDarkMode?`tooltip-arrow-dark`:`tooltip-arrow`}>{t('Homepage.Tutorial.Tooltip.IgnoreNasalSound')}</Tooltip>
                                        <Tooltip id="cbSimilarVowel" place='right' className={isDarkMode?'tooltip-dark':'tooltip'} classNameArrow={isDarkMode?`tooltip-arrow-dark`:`tooltip-arrow`}>{t('Homepage.Tutorial.Tooltip.SimilarVowel')}</Tooltip>
                                        <Tooltip id="cbIgnoreFinalSound" place='left' className={isDarkMode?'tooltip-dark':'tooltip'} classNameArrow={isDarkMode?`tooltip-arrow-dark`:`tooltip-arrow`}>{t('Homepage.Tutorial.Tooltip.IgnoreFinalSound')}</Tooltip>
                                        <Tooltip id="cbSameArticulationPart" place='right' className={isDarkMode?'tooltip-dark':'tooltip'} classNameArrow={isDarkMode?`tooltip-arrow-dark`:`tooltip-arrow`}>{t('Homepage.Tutorial.Tooltip.SameArticulationPart')}</Tooltip>
                                        <Tooltip id="cbSameTone" place='right' className={isDarkMode?'tooltip-dark':'tooltip'} classNameArrow={isDarkMode?`tooltip-arrow-dark`:`tooltip-arrow`}>{t('Homepage.Tutorial.Tooltip.SameTone')}</Tooltip>
                                    </div>

                            </div>
                        </div>
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