/* Ūn ba̍k chóng lám */
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import RhymeCard from "../components/RhymeCard";

function Rhymes(){
    const [t] = useTranslation();

    const allRhymes = [
        // 韻腹 [a]
        "a", "aⁿ", "am", "an", "ang", "ap", "at", "ak", "ah", "ahⁿ",

        // 韻腹 [ai]
        "ai", "aiⁿ", "aih", "aihⁿ",

        // 韻腹 [au]
        "au", "auh",

        // 韻腹 [e]
        "e", "eⁿ", "eh", "ehⁿ",

        // 韻腹 [i]
        "i", "im", "in", "ip", "it", "ih", "ihⁿ",

        // 韻腹 [ia]
        "ia", "iaⁿ", "iam", "ian", "iap", "iat", "iak", "iah", "iahⁿ",

        // 韻腹 [iau]
        "iau", "iauⁿ", "iauh",

        // 韻腹 [io]
        "io", "eng", "ek", "ioh",

        // 韻腹 [iong]
        "iong", "iok",

        // 韻腹 [iu]
        "iu", "iuⁿ", "iuh", "iuhⁿ",

        // 韻腹 [ə]/[o]
        "o", "oh",

        // 韻腹 [ɔ]
        "o͘", "oⁿ", "om", "ong", "ohⁿ", "ok",

        // 韻腹 [oa]
        "oa", "oaⁿ", "oan", "oat", "oah",

        // 韻腹 [oai]
        "oai", "oaiⁿ",

        // 韻腹 [oe]
        "oe", "oeh",

        // 韻腹 [u]
        "u", "un", "ut", "uh",

        // 韻腹 [ui]
        "ui",

        // 特殊韻母 [m] (自成音節)
        "m", "mh",

        // 特殊韻母 [ng] (自成音節)
        "ng", "ngh"
    ];
    const allRhymesExample = [
        // 韻腹 [a]
        "巴", "三", "掩", "安", "紅", "壓", "遏", "握", "鴨", "唅",

        // 韻腹 [ai]
        "哀", "喈", "哎", "aihⁿ",

        // 韻腹 [au]
        "歐", "𩛩",

        // 韻腹 [e]
        "矮", "嬰", "厄", "ehⁿ",

        // 韻腹 [i]
        "伊", "音", "因", "入", "食", "滴", "ihⁿ",

        // 韻腹 [ia]
        "命", "影", "鹽", "緣", "葉", "擛", "摔", "頁", "iahⁿ",

        // 韻腹 [iau]
        "夭", "iauⁿ", "iauh",

        // 韻腹 [io]
        "腰", "英", "易", "臆",

        // 韻腹 [iong]
        "用", "欲",

        // 韻腹 [iu]
        "右", "洋", "iuh", "iuhⁿ",

        // 韻腹 [ə]/[o]
        "高", "學",

        // 韻腹 [ɔ]
        "烏", "oⁿ", "參", "王", "ohⁿ", "惡",

        // 韻腹 [oa]
        "沙", "官", "遠", "越", "活",

        // 韻腹 [oai]
        "歪", "關",

        // 韻腹 [oe]
        "話", "郭",

        // 韻腹 [u]
        "羽", "韻", "鬱", "欶",

        // 韻腹 [ui]
        "為",

        // 特殊韻母 [m] (自成音節)
        "毋", "mh",

        // 特殊韻母 [ng] (自成音節)
        "黃", "ngh"
    ];
    const getRhymeCards = (rhyme: string, exampleHanji: string, amount?: number) => {
        return(<RhymeCard rhyme={rhyme} exampleHanji={(rhyme===exampleHanji)?'':exampleHanji} amount={amount?amount:0} className="m-2"/>)
    }
    const getExampleRhymeCards = () => {
        return allRhymes.map((value,index)=>(getRhymeCards(value,allRhymesExample[index],index)));
    }

    return(
        <>
            <Header/>

            <div id='main-container' className='min-h-screen h-full w-full mx-au to flex flex-col items-center dark:bg-main-dark not-dark:bg-main'>
                <h1 className='m-2 font-[phiaute] text-5xl self-center dark:text-gray-200 not-dark:text-black'>{t('Rhymes.Title')}</h1>
                <div id='grid-of-rhymes' className="grid justify-items-center grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 max-w-screen-lg mx-auto p-2">
                    {getExampleRhymeCards()}
                </div>
            </div>
        </>
    )
}

export default Rhymes;