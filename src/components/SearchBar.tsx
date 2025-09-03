import type { SearchBarType } from "../types/types";

function SearchBar(props:SearchBarType){
    const getOptions = ()=>{
        try{
            return (props.options!).map(optionObj => (
                <option value={optionObj.value}>{optionObj.text}</option>
            ));
        }catch{
            throw Error('Not a proper object to deal with. e.Message:');
        }
    }

    return(
        <>
            <div className={`flex flex-col items-center font-[iansui] ${props.className}`}>
                <div className='flex flex-col w-full lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm '>
                    <label className='dark:text-element-dark' htmlFor='searchbar'>{props.label}</label>
                    <form id="searchbarContainer" className="flex flex-row p-1">
                        <input id='searchbar' className="text-element min-w-0 dark:text-element-dark flex-grow border-2 border-r-0 border-interactive dark:border-interactive-dark bg-main dark:bg-main-dark dark:placeholder-element-dark rounded-l-lg focus:ring-2 focus:ring-interactive dark:focus:ring-interactive-dark" type="search" placeholder={props.placeholder}/>
                        {
                            (props.options!==undefined)?
                            (
                                <select className="border-2 border-l-0 border-r-0 border-interactive dark:border-interactive-dark dark:text-element-dark dark:bg-main-dark">
                                    {getOptions()}
                                </select>
                            ):
                            <></>
                        }
                        <button type="submit" className="bg-interactive dark:bg-interactive-dark hover:bg-interactive-hover dark:hover:bg-interactive-hover-dark p-2 border-interactive dark:border-interactive-dark rounded-r-lg rounded-br-lg" onClick={()=>{
                            if(!props.submitAction===undefined && !props.json===undefined){
                                props.submitAction!(props.json!);
                            }
                        }}>
                            <svg className="w-4 h-4 text-white dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SearchBar;