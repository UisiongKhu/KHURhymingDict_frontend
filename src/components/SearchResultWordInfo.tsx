import { useTranslation } from "react-i18next";
import type { SearchResultWordInfoType, Syllable } from "../types/types";
import { getSyllableAmount } from "../misc/misc";
import { useEffect, useState } from "react";

function SearchResultWordInfo(props: SearchResultWordInfoType){

    const [t] = useTranslation();
    const [syllables, setSyllables] = useState<Syllable[]>([]);
    const [isSyllableExist, setIsSyllableExist] = useState<boolean>(false);

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
        };
        fetchWord();
    },[]);

    return (
        <div id="search-result-word-info" className={`flex flex-col bg-main dark:bg-main-dark text-element dark:text-element-dark border-2 rounded-xl border-blue-600 dark:border-blue-700 p-2 ${props.className}`}>
            <p className="text-2xl mb-5">{t("Components.SearchResultWordInfo.Title")}</p>
            <p className="text-lg">{t("Components.SearchResultWordInfo.Lomaji")}: {props.lomaji}</p>
            <p className="text-lg">{t("Components.SearchResultWordInfo.HanjiKip")}: {props.hanjiKip}</p>
            {/* Chit pha ài kái */}
            <p className="text-lg mb-2">{getSyllableAmount(props.lomaji)} {t("Components.SearchResultWordInfo.Syllable", {amount: getSyllableAmount(props.lomaji)})}</p>

            {isSyllableExist ? syllables?.map((syllable, index) => {
                return (
                    <div>
                        <p key={`syllable-${index}`} className="text-xl">{t("Components.SearchResultWordInfo.SyllableSerial")} {index + 1}</p>
                        <p key={`syllable-content-${index}`} className="text-lg">{syllable.lomaji} {syllable.hanjiKip}</p>
                        <p key={`syllable-vowel-${index}`} className="text-lg">{`${t("Components.SearchResultWordInfo.Vowel")}: ${syllable.vowel}`}</p>
                        <p key={`syllable-coda-${index}`} className="text-lg">{`${t("Components.SearchResultWordInfo.Coda")}: ${syllable.coda}`}</p>
                        <p key={`syllable-tone-${index}`} className="text-lg mb-3">{`${t("Components.SearchResultWordInfo.Tone")}: ${syllable.tone}`}</p>
                    </div>
                );
            }) : <></>}
        </div>
    );
}



export default SearchResultWordInfo;