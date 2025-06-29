import { useTranslation } from "react-i18next";
import { to10KCommaString } from "../misc/misc";
import type { RhymeCardType } from "../types/types";

function RhymeCard(props: RhymeCardType){

    const [t] = useTranslation();

    return(
        <>
            <div className={`grid grid-cols-1 grid-rows-3 lg:w-40 lg:h-40 sm:w-35 sm:h-35 w-28 h-28 text-center rounded-md bg-interactive dark:bg-interactive-dark text-white dark:text-element-dark not-dark:hover:font-semibold not-dark:hover:border-3 dark:hover:bg-interactive-hover-dark border-infobd dark:border-infobd-dark ${props?.className}`}>
                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl">{props.rhyme}</h1>
                <div className="grid grid-cols-4 grid-rows-2 w-2/3 mx-auto">
                    <h1 className="lg:text-5xl md:text-5xl sm:text-4xl text-4xl col-start-2 col-span-2 row-span-2">{props.exampleHanji}</h1>
                    <p className="col-span-1 row-span-1 col-start-4 row-start-2" >{props?.note}</p>
                </div>
                <p className="lg:text-lg md:text-lg sm:text-md text-md align-text-bottom p-2">{`${to10KCommaString(props.amount)} ${t('RhymeCard.Amount', {count: props.amount})}`}</p>
            </div>
        </>
    )
}

export default RhymeCard;