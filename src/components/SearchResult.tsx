import type { SearchResultType } from "../types/types";

function SearchResult(props: SearchResultType){
    return (
        <tr key={`row-${props.lomaji}`} className={`search-result-item justify-between text-xl ${props.className}`}>
            <td colSpan={3} key={props.lomaji}>{props.lomaji}</td>
            <td colSpan={2} key={`${props.lomaji}-${props.hanjiKip}`}>{props.hanjiKip}</td>
            <td colSpan={1} key={`infoBtn-${props.lomaji}`} className="flex flex-row justify-end">
                <button className="text-sm text-green-500 underline">Info</button>
            </td>
        </tr>
    )
}

export default SearchResult;