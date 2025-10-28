import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Checkbox from "../components/Checkbox";
import type { RhymeSearchOptionStates, SearchResultType } from "../types/types";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import RhymeSearchResults from "../components/RhymeSearchResults";
import { isHanji } from "../misc/misc";
import SearchResultWordInfo from "../components/SearchResultWordInfo";
function SimpleSearch(){
    const [t] = useTranslation();
    const wordInfoRef =  useRef<HTMLDivElement>(null);
    const [optionsVisible, setOptionsVisible] = useState(true);
    const [infoVisible, setInfoVisible] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [firstTimeSumbit, setFirstTimeSumbit] = useState(false);
    const [currentWordInfoParam, setCurrentWordInfoParam] = useState<{ lomaji: string; hanjiKip: string } | null>(null);
    const [showWordInfo, setShowWordInfo] = useState(false);
    const [wordInfoExiting, setWordInfoExiting] = useState(false);
    const [getSearchOptionStates, setSearchOptionStates] = useState<RhymeSearchOptionStates>( {
        IgnoreNasalSound: false,
        SimilarVowel: false,
        IgnoreFinalSound: false,
        SameArticulationPart: false,
        SameTone: false,
    });
    const [rhymingSyllableCount, setRhymingSyllableCount] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState(Array<SearchResultType>);
    const [getSearchBarInput, setSearchBarInput] = useState("");
    const keyofSearchOptionStates = Object.keys(getSearchOptionStates) as (keyof RhymeSearchOptionStates)[];
    const OptionsStringArray = t<'SearchBar.Homepage.Dropdown.Options', { returnObjects: true }, string[]>('SearchBar.Homepage.Dropdown.Options', { returnObjects: true }).map(v=>v);
    const getSearchBarDropdownOptions = () =>{
        return OptionsStringArray.map(optionStr => Object({value: OptionsStringArray.indexOf(optionStr)+1, text: optionStr})
        );
    }

    const handleChecked = (event: ChangeEvent<HTMLInputElement>)=>{
        const id = String(event.target.id).replace('cb','');
        console.log(`Clicked. id=${id} checked=${event.target.checked}`);
        if(keyofSearchOptionStates.includes(id as keyof RhymeSearchOptionStates)){
            setSearchOptionStates(prevOptions => ({
                ...prevOptions,
                [id]: event.target.checked,
            }))
        }
    }
    const handleOptionVisible = () => {
        setOptionsVisible(!optionsVisible);
    }
    const handleInfoVisible = () => {
        setInfoVisible(!infoVisible);
    }
    
    const handleSearchBarInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchBarInput(event.target.value);
    }

    const handleSearchBarSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setRhymingSyllableCount(Number(event.target.value));
    }

    const handleWordInfoClick = (lomaji: string, hanjiKip: string) => {
        setCurrentWordInfoParam({ lomaji, hanjiKip });
        setShowWordInfo(true);
    }

    const handleWordInfoClose = () => {
        setWordInfoExiting(true);
    }

    const handleSumbit = async (props: {keyword: string}) => {
        if(!firstTimeSumbit) setFirstTimeSumbit(true);
        if(props.keyword === undefined || props.keyword === ""){
            alert(t('SearchBar.ErrorMessage.Empty'));
        }else{
            setSubmited(true);
            setKeyword(props.keyword);
        }
    }

    useEffect(()=>{
        console.log(`new state: ${JSON.stringify(getSearchOptionStates)}`)
    },[getSearchOptionStates])

    useEffect(()=>{
    }, [firstTimeSumbit, optionsVisible, infoVisible]);

    useEffect(()=>{
        const fetchResults = async () => {
            if(submited){
                // Call Rhyming API
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const queryData : {
                    lomaji?:string,
                    hanjiKip?:string,}={};
                if(isHanji(keyword)){
                    queryData.hanjiKip = keyword;
                }else{
                    queryData.lomaji = keyword;
                }
                const params = new URLSearchParams(queryData);
                params.append('ignoreNasalSound', String(getSearchOptionStates.IgnoreNasalSound));
                params.append('ignoreFinalSound', String(getSearchOptionStates.IgnoreFinalSound));
                params.append('sameArticulationPart', String(getSearchOptionStates.SameArticulationPart));
                params.append('sameTone', String(getSearchOptionStates.SameTone));
                params.append('similarVowel', String(getSearchOptionStates.SimilarVowel));
                params.append('rhymingSyllableCount', rhymingSyllableCount.toString());
                console.log(rhymingSyllableCount);
                const response = await fetch(`${apiUrl}/rhyming/word?${params.toString()}`, {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(`Response Status: ${response.status}`)
                if(response.status === 200){
                    const result = await response.json().then(res=>res.data);
                    setSearchResults(result);
                    if(result.length===0){
                        setOptionsVisible(true);
                        alert(t('SearchBar.SimpleSearch.Error.NoResult'));   
                    }else{
                        setOptionsVisible(false);
                    }
                }else{
                    setOptionsVisible(true);
                    alert(t('SearchBar.SimpleSearch.Error.SearchFailed'));   
                }
                setInfoVisible(false);
            }
        };
        fetchResults();
        setSubmited(false);
    }, [submited])

    useEffect(()=>{
        let timer: ReturnType<typeof setTimeout>;
        if(wordInfoExiting){
            timer = setTimeout(()=>{setShowWordInfo(false);setWordInfoExiting(false);setCurrentWordInfoParam(null);},200);
        }
        return ()=>{
            if(timer){
                clearTimeout(timer);
            }
        }
    }, [wordInfoExiting]);

    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if (wordInfoRef.current && !wordInfoRef.current.contains(event.target as Node)) {
                if(showWordInfo){
                    handleWordInfoClose();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showWordInfo]);

    return(
        <>
            <Header/> 
            <div className='h-content min-h-screen bg-main dark:bg-main-dark text-element dark:text-element-dark'>
                <div className="flex flex-col justify-center">
                    <h1 className='self-center mt-10 font-[phiaute] text-5xl'>{t('Search.SimpleSearch.Title')}</h1>
                    <SearchBar label={t('SearchBar.SimpleSearch.Label')} input={getSearchBarInput} inputFunc={handleSearchBarInput} selectFunc={handleSearchBarSelect} placeholder={t('SearchBar.SimpleSearch.Placeholder')} options={getSearchBarDropdownOptions()} onClick={()=>handleSumbit({keyword: getSearchBarInput})} />

                    <div id="option-container" className="font-[iansui] self-center mt-2 p-2 lg:w-1/2 md:w-2/3 sm:w-2/3 w-4/5 rounded-lg border-2 border-infobd dark:border-infobd-dark">
                        <div id="option-title-container" className="flex flex-row justify-between">
                            <h1 className="text-lg text-left mb-1">{t('Search.SimpleSearch.SearchOption.Title')}</h1>
                            <button type="button" onClick={handleOptionVisible}>
                                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"/>
                                </svg>
                            </button>
                        </div>
                        <div id="option-content-container" className={`grid grid-cols-2 gap-2 text-left text-md ${(optionsVisible)?'':'hidden'}`}>
                            <h2>{t('Search.SimpleSearch.SearchOption.SubTitle.Nucleus')}</h2><br/>
                                <Checkbox checkboxId="cbNasalSound" label={t('Search.SimpleSearch.SearchOption.NasalSound')} onChangeFunc={handleChecked} />
                                <Checkbox checkboxId="cbSimilarVowel" label={t('Search.SimpleSearch.SearchOption.SimilarVowel')} onChangeFunc={handleChecked}/>
                            <h2>{t('Search.SimpleSearch.SearchOption.SubTitle.Coda')}</h2><br/>
                                <Checkbox checkboxId="cbIgnoreFinalSound" label={t('Search.SimpleSearch.SearchOption.IgnoreFinalSound')} onChangeFunc={handleChecked}/>
                                <Checkbox checkboxId="cbSameArticulationPart" label={t('Search.SimpleSearch.SearchOption.SameArticulationPart')} onChangeFunc={handleChecked}/>
                            <h2>{t('Search.SimpleSearch.SearchOption.SubTitle.Tone')}</h2><br/>
                                <Checkbox checkboxId="cbSameTone" label={t('Search.SimpleSearch.SearchOption.SameTone')} onChangeFunc={handleChecked}/>
                        </div>
                    </div>

                    <div id="info-container" className="font-[iansui] self-center mt-2 mb-2 p-2 lg:w-1/2 md:w-2/3 sm:w-2/3 w-4/5 rounded-lg border-2 border-infobd dark:border-infobd-dark">
                        <div id="info-title-container" className="flex flex-row justify-between">
                            <h1 className="text-lg text-left text-element dark:text-element-dark mb-1">{t('Search.SimpleSearch.SearchOptionInfo.Title')}</h1>
                            <button type="button" onClick={handleInfoVisible}>
                                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"/>
                            </svg>
                            </button>
                        </div>
                        <div id="info-content-container" className={`grid grid-cols-3 gap-2 ${(infoVisible)?'':'hidden'}`}>
                            <h3 className="col-span-1">{t('Search.SimpleSearch.SearchOptionInfo.Default.Title')}</h3>
                            <p className="col-span-2">{t('Search.SimpleSearch.SearchOptionInfo.Default.Content')}</p>

                            <h3 className="col-span-1">{t('Search.SimpleSearch.SearchOptionInfo.NasalSound.Title')}</h3>
                            <p className="col-span-2">{t('Search.SimpleSearch.SearchOptionInfo.NasalSound.Content')}</p>

                            <h3 className="col-span-1">{t('Search.SimpleSearch.SearchOptionInfo.SimilarVowel.Title')}</h3>
                            <p className="col-span-2">{t('Search.SimpleSearch.SearchOptionInfo.SimilarVowel.Content')}</p>

                            <h3 className="col-span-1">{t('Search.SimpleSearch.SearchOptionInfo.IgnoreFinalSound.Title')}</h3>
                            <p className="col-span-2">{t('Search.SimpleSearch.SearchOptionInfo.IgnoreFinalSound.Content')}</p>

                            <h3 className="col-span-1">{t('Search.SimpleSearch.SearchOptionInfo.SameArticulationPart.Title')}</h3>
                            <p className="col-span-2">{t('Search.SimpleSearch.SearchOptionInfo.SameArticulationPart.Content')}</p>

                            <h3 className="col-span-1">{t('Search.SimpleSearch.SearchOptionInfo.SameTone.Title')}</h3>
                            <p className="col-span-2">{t('Search.SimpleSearch.SearchOptionInfo.SameTone.Content')}</p>
                        </div>
                    </div>
                    {(firstTimeSumbit && searchResults.length>0) && 
                    <RhymeSearchResults className={`font-[iansui] self-center border-2 mt-2 mb-2 lg:w-1/2 md:w-2/3 sm:w-2/3 w-4/5 rounded-lg border-infobd dark:border-infobd-dark`} results={searchResults} onWordInfoClick={handleWordInfoClick} />}
                    
                </div>
            </div>
            {currentWordInfoParam && showWordInfo &&
                // Display Word Info fixed to the middle of the screen
                <div className={`font-[iansui] fixed inset-0 flex items-center justify-center overflow-y-auto p-2 
                ${showWordInfo && !wordInfoExiting ? ' animate-enlarge' : ''}
                ${showWordInfo && wordInfoExiting ? ' animate-shrink' : ''}`}>
                    <SearchResultWordInfo ref={wordInfoRef} lomaji={currentWordInfoParam.lomaji} hanjiKip={currentWordInfoParam.hanjiKip} className="rounded-lg shadow-xl max-w-2xl w-full" onClose={handleWordInfoClose}/>
            </div>}
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default SimpleSearch;