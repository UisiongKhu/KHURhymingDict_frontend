import { Trans, useTranslation } from "react-i18next";
import type { RhymeSearchResultsType } from "../types/types";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";

function RhymeSearchResults(props: RhymeSearchResultsType){
    const [t] = useTranslation();
    const isShowResults = props.results!==undefined && props.results.length>0;
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const totalPages = Math.ceil((props.results!.length)/(resultsPerPage))||0;

    const handleCurrentPageChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const page = parseInt(value);
        if(!isNaN(page) && page>0 && page<=totalPages){
            setCurrentPage(page);
        }else if(!isNaN(page) && page>0 && page>totalPages){
            event.target.value = totalPages.toString();
            setCurrentPage(totalPages);
        }else if(value===""){
            // Do nothing
        }else{
            alert("Please enter a valid page number between 1 and "+totalPages);
        }
    }

    const handlePerPageChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const perPage = parseInt(value);
        if(!isNaN(perPage) && perPage>0){
            setResultsPerPage(perPage);
            // set CurrentPage to 1 when resultsPerPage changes, also change currentPage input value to 1
            const pageInput = document.getElementById("rhyme-search-results-page-input") as HTMLInputElement;
            if(pageInput){
                pageInput.value = "1";
            }
            setCurrentPage(1);
        }else{
            alert("Please enter a valid number greater than 0");
        }
    }

    useEffect(() => {
        if(currentPage>totalPages){
            setCurrentPage(totalPages);
        }
    }, [currentPage, resultsPerPage]);

    return (
        <div id="rhyme-search-results-main-container" className={`flex flex-col w-full`}>
            <div id="rhyme-search-results-pagination-container" className="flex flex-row self-center justify-end mt-2 mb-2 lg:w-1/2 md:w-2/3 sm:w-2/3 w-4/5 gap-2 my-4">
                <Trans i18nKey="Components.RhymeSearchResults.Pagination.PageText" components={
                    [<input type="number" key="pageInput" id="rhyme-search-results-page-input" className="text-center w-1/10 rounded-md border-1 border-infobd dark:border-infobd-dark" defaultValue={currentPage} min={1} onChange={handleCurrentPageChanged}/>,
                    <input type="number" key="perPageInput" id="rhyme-search-results-per-page-input" className="text-center w-1/10 rounded-md border-1 border-infobd dark:border-infobd-dark" defaultValue={resultsPerPage} min={1} onChange={handlePerPageChanged}/>]
                } values={{totalPages: totalPages,totalItems: props.results?.length || 0}}>
                </Trans>
            </div>
            <div id="rhyme-search-results-data-container" className={`px-2 ${props.className}`}>
                <table id="rhyme-search-results-table" className="w-full table-fixed">
                    <thead key="thead">
                    {isShowResults?<tr key="row-head">
                            <th key="headLomaji" colSpan={3}>{t('Components.RhymeSearchResults.Header.Lomaji')}</th>
                            <th key="headHanjiKip" colSpan={3}>{t('Components.RhymeSearchResults.Header.HanjiKip')}</th>
                    </tr>:<></>} 
                    </thead>
                    <tbody key="tbody">
                    {isShowResults?
                    props.results!.slice((currentPage-1)*resultsPerPage,currentPage*resultsPerPage).map((result)=>(<SearchResult lomaji={result.lomaji} hanjiKip={result.hanjiKip} onClick={props.onWordInfoClick} />))
                    :
                    <></>
                    }
                    </tbody>
                </table>
            </div>
        </div>
            
        
    );
}

export default RhymeSearchResults;