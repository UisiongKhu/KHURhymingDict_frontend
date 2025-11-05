import { useTranslation } from "react-i18next";
import type { SearchResultWordInfoType, Syllable } from "../types/types";
import { getSyllableAmount, getToneNameHanji } from "../misc/misc";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function SearchResultWordInfo(props: SearchResultWordInfoType){

    const [t, i18n] = useTranslation();
    const [syllables, setSyllables] = useState<Syllable[]>([]);
    const [isSyllableExist, setIsSyllableExist] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const dataToSyllables = (data:any) => {
        const syllablesData =  data.wordLinks.map((link:any)=> link.syllable);
        return syllablesData.map((syllableData:any) => {
            const syllable : Syllable = {
                lomaji: syllableData.lomaji,
                hanjiKip: syllableData.hanjiKip,
                vowel: syllableData.vowel,
                coda: syllableData.coda,
                tone: syllableData.tone,
                nasal: syllableData.nasal
            };
            return syllable;
        });
    };


    useEffect(() => {
        setLoading(true);
        // Fetch Word Info
        const fetchWord = async () => {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const params = new URLSearchParams({ lomaji: props.lomaji, hanjiKip: props.hanjiKip });
            const response = await fetch(`${apiUrl}/words/detail?${params.toString()}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                const data = await response.json();
                if(Object.keys(data).length > 0){
                    /* {"id":734,"lomaji":"jîn-seng","hanjiKip":"人生", ... ,"wordLinks":[
                        {"order":0,"syllable":{"id":11,"lomaji":"jîn","hanjiKip":"人","vowel":"i","coda":"n","tone":5}},
                        {"order":1,"syllable":{"id":268,"lomaji":"seng","hanjiKip":"生","vowel":"e","coda":"ng","tone":1}}
                    ]} */
                    const syllables = dataToSyllables(data);
                    setSyllables(syllables);
                    setIsSyllableExist(syllables.length > 0);
                }else{
                    alert("Word Not Found in Database.");
                }
            }
            else{
                alert("Cannot Fetch Word Info, please contact the developer.");
            }
            setLoading(false);
        };
        fetchWord();
    },[]);

    return (
        <div id="search-result-word-info" ref={props.ref} className={`flex flex-col bg-main dark:bg-main-dark text-element dark:text-element-dark border-2 rounded-xl border-blue-600 dark:border-blue-700 p-2 ${props.className}`}>
            <div className="flex flex-row justify-between">
                <div/>
                <p className="mt-1 text-4xl mb-5 font-[phiaute]">{t("Components.SearchResultWordInfo.Title")}</p>
                <button className="pb-6" onClick={props.onClose}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24"/>
                        <path d="M7 17L16.8995 7.10051" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7 7.00001L16.8995 16.8995" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <p className="text-4xl text-center"><b>{props.lomaji}</b></p>
            <p className="text-5xl text-center"><b>{props.hanjiKip}</b></p>
            {/* Chit pha ài kái */}
            <p className="text-xl mb-2 text-end pe-5">{getSyllableAmount(props.lomaji)} {t("Components.SearchResultWordInfo.Syllable", {count: getSyllableAmount(props.lomaji)})}</p>

            {isSyllableExist && loading && <Loading className="text-element dark:text-element-dark" text={t('Components.Loading.SearchResultWordInfo')} />}
            {isSyllableExist && !loading ? syllables?.map((syllable, index) => {
                return (
                    <div key={`syllable-container-${index}`} className="flex flex-col items-center mb-2">
                        <p key={`syllable-serial-${index}`} className="text-xl">{t("Components.SearchResultWordInfo.SyllableSerial")} {index + 1}</p>
                        <div key={`syllable-table-${index}`} className="grid w-3/4 grid-rows-6 grid-cols-4 border-2 border-infobd dark:border-infobd-dark">
                            <p key={`syllable-content-${index}`} className="py-2 text-4xl text-center col-span-2 row-span-3 border-r-2 border-infobd dark:border-infobd-dark">{syllable.lomaji}</p>
                            <p key={`syllable-vowel-title-${index}`} className="text-lg text-center ps-2 row-span-2 border-r-2 border-b-2 border-infobd dark:border-infobd-dark"><b>{`${t("Components.SearchResultWordInfo.Vowel")}`}</b></p>
                            <p key={`syllable-vowel-data-${index}`} className="text-lg text-center ps-2 row-span-2 border-b-2 border-infobd dark:border-infobd-dark">{syllable.vowel}</p>
                            <p key={`syllable-coda-title-${index}`} className="text-lg text-center ps-2 row-span-2 border-r-2 border-b-2 border-infobd dark:border-infobd-dark"><b>{`${t("Components.SearchResultWordInfo.Coda")}`}</b></p>
                            <p key={`syllable-coda-data-${index}`} className="text-lg text-center ps-2 row-span-2 border-b-2 border-infobd dark:border-infobd-dark">{syllable.coda}</p>
                            <p key={`syllable-content-${index}`} className="text-4xl text-center col-span-2 row-span-3 border-r-2 border-infobd dark:border-infobd-dark">{syllable.hanjiKip}</p>
                            <p key={`syllable-tone-title-${index}`} className="text-lg text-center ps-2 row-span-2 border-r-2 border-infobd dark:border-infobd-dark"><b>{`${t("Components.SearchResultWordInfo.Tone")}`}</b></p>
                            <p key={`syllable-tone-data-${index}`} className="text-lg text-center ps-2 row-span-2 border-infobd dark:border-infobd-dark">{i18n.language==="tg_HJ" && getToneNameHanji(syllable.tone) } {syllable.tone}</p>
                        </div>
                    </div>
                );
            }) : <></>}
        </div>
    );
}



export default SearchResultWordInfo;