import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Checkbox from "../components/Checkbox";
import type { RhymeSearchOptionStates } from "../types/types";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
function SimpleSearch(){
    const [t] = useTranslation();
    const [getSearchOptionStates, setSearchOptionStates] = useState<RhymeSearchOptionStates>({
        NasalSound: false,
        SimilarVowel: false,
        IgnoreFinalSound: false,
        SameArticulationPart: false,
        SameTone: false,
    });
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
    
    useEffect(()=>{
        console.log(`new state: ${JSON.stringify(getSearchOptionStates)}`)
    },[getSearchOptionStates])

    return(
        <>
            <Header/> 
            <div className='h-content min-h-screen bg-main dark:bg-main-dark text-element dark:text-element-dark'>
                <div className="flex flex-col justify-center">
                    <h1 className='self-center mt-10 font-[phiaute] text-5xl'>{t('Search.SimpleSearch.Title')}</h1>
                    <SearchBar label={t('SearchBar.SimpleSearch.Label')} placeholder={t('SearchBar.SimpleSearch.Placeholder')} options={getSearchBarDropdownOptions()}/>
                    <div id="option-container" className="font-[iansui] self-center mt-2 p-2 lg:w-1/2 md:w-2/3 sm:w-2/3 w-4/5 rounded-lg border-2 border-infobd dark:border-infobd-dark">
                        <h1 className="text-lg text-left mb-1">{t('Search.SimpleSearch.SearchOption.Title')}</h1>
                        <div className="grid grid-cols-2 gap-2 text-left text-md">
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
                        <h1 className="text-lg text-left text-element dark:text-element-dark mb-1">{t('Search.SimpleSearch.SearchOptionInfo.Title')}</h1>
                        <div id="info-content-container" className="grid grid-cols-3 gap-2">
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
                </div>
            </div>
        </>
    )
}

export default SimpleSearch;