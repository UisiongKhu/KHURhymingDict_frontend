import { useTranslation } from "react-i18next";
import type { RhymeSearchResultsType } from "../types/types";
import SearchResult from "./SearchResult";

function RhymeSearchResults(props: RhymeSearchResultsType){
    const [t] = useTranslation();
    const isShowResults = props.results!==undefined && props.results.length>0;
    return (
        <div id="rhyme-search-results-container" className={`px-2 ${props.className}`}>
            <table id="rhyme-search-results-table" className="w-full table-fixed">
                <thead key="thead">
                {isShowResults?<tr key="row-head">
                        <th key="headLomaji" colSpan={3}>{t('Components.RhymeSearchResults.Header.Lomaji')}</th>
                        <th key="headHanjiKip" colSpan={3}>{t('Components.RhymeSearchResults.Header.HanjiKip')}</th>
                </tr>:<></>} 
                </thead>
                <tbody key="tbody">
                {isShowResults?
                props.results!.map((result)=>(<SearchResult lomaji={result.lomaji} hanjiKip={result.hanjiKip} onClick={props.onWordInfoClick} />))
                :
                <></>
                }
                </tbody>
            </table>
        </div>
        
    );
}

export default RhymeSearchResults;