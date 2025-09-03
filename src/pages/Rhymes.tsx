/* Ūn ba̍k chóng lám */
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import RhymeCard from "../components/RhymeCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

interface RhymeType {
  id: number;
  lomaji: string;
  hanji: string | null; // hanji 可能為 null
  vowel: string;
  coda: string | null; // coda 可能為 null
  nasal: boolean;
  desc: string | null; // desc 可能為 null
  dataCounts: number;
  createdAt: string; // 從 API 來的日期通常是字串，除非你特別處理過
  updatedAt: string; // 從 API 來的日期通常是字串
  // 注意：Sequelize 預設會返回 created_at 和 updated_at 為 createdAt 和 updatedAt
  // 如果你的 API 返回的欄位名稱跟這裡不一樣，需要調整
}

function Rhymes(){
    const [t] = useTranslation();
    const [rhymes, setRhymes] = useState<RhymeType[]>([]);

    const allRhymes = [
            // 韻腹 [a]
            "a", "aⁿ", "am", "an", "ang", "ap", "at", "ak", "ah", "ahⁿ",

            // 韻腹 [ai]
            "ai", "aiⁿ", "aih", "aihⁿ",

            // 韻腹 [au]
            "au", "auh", "auⁿ", "auhⁿ",

            // 韻腹 [e]
            "e", "eⁿ", "eh", "ehⁿ",

            // 韻腹 [i]
            "i", "iⁿ", "im", "in", "ip", "it", "ih", "ihⁿ",

            // 韻腹 [ia]
            "ia", "iaⁿ", "iam", "ian", "iang", "iap", "iat", "iak", "iah", "iahⁿ",

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
            "o͘", "o͘h", "oⁿ", "om", "ong", "ohⁿ", "ok", "op",

            // 韻腹 [oa]
            "oa", "oaⁿ", "oan", "oang", "oat", "oah",

            // 韻腹 [oai]
            "oai", "oaiⁿ",

            // 韻腹 [oe]
            "oe", "oeh", "oeⁿ",

            // 韻腹 [u]
            "u", "un", "ut", "uh",

            // 韻腹 [ui]
            "ui", "uih", "ûiⁿ",

            // 特殊韻母 [m] (自成音節)
            "m", "mh",

            // 特殊韻母 [ng] (自成音節)
            "ng", "ngh"
        ];
        const allRhymesExample = [
            // 韻腹 [a]
            "巴", "三", "掩", "安", "紅", "壓", "遏", "握", "鴨", "唅",

            // 韻腹 [ai]
            "哀", "喈", "哎", "",

            // 韻腹 [au]
            "歐", "𩛩", "腦" ,"卯",

            // 韻腹 [e]
            "矮", "嬰", "厄", "",

            // 韻腹 [i]
            "伊", "嬰" , "音", "因", "入", "食", "滴", "",

            // 韻腹 [ia]
            "命", "影", "鹽", "緣", "央", "葉", "擛", "摔", "頁", "",

            // 韻腹 [iau]
            "夭", "", "",

            // 韻腹 [io]
            "腰", "英", "易", "臆",

            // 韻腹 [iong]
            "用", "欲",

            // 韻腹 [iu]
            "右", "洋", "", "",

            // 韻腹 [ə]/[o]
            "高", "學",

            // 韻腹 [ɔ]
            "烏", "膜", "", "參", "王", "", "惡", "橐",

            // 韻腹 [oa]
            "沙", "官", "遠", "嚾", "越", "活",

            // 韻腹 [oai]
            "歪", "關",

            // 韻腹 [oe]
            "話", "郭", "妹",

            // 韻腹 [u]
            "羽", "韻", "鬱", "欶",

            // 韻腹 [ui]
            "為", "血", "梅",

            // 特殊韻母 [m] (自成音節)
            "毋", "",

            // 特殊韻母 [ng] (自成音節)
            "黃", ""
        ] ;
    const getRhymeCards = (rhyme: string, exampleHanji: string|null, amount?: number) => {
        return(<RhymeCard rhyme={rhyme} exampleHanji={(exampleHanji===null)?'':exampleHanji} amount={amount?amount:0} className="m-2"/>)
    }
    const getExampleRhymeCards = () => {
        return allRhymes.map((value,index)=>(getRhymeCards(value,allRhymesExample[index],index)));
    }
    const getFetchedRhymeCards = () => {
        return rhymes.map(data=>{
            return (getRhymeCards(data.lomaji, data.hanji, data.dataCounts))
        })
    }

    useEffect(()=>{
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        console.log(apiUrl);
        try {
            const fetchRhymes = async () => {
                const response =  await fetch(`${apiUrl}/rhymes`);
                if(!response.ok){
                    throw new Error(`HTTP Error, Status Code: ${response.status}`);
                }else{
                    console.log('GET OK!')
                }
                const data = await response.json();
                setRhymes(data);
            }
            fetchRhymes();
            console.log(rhymes);
        } catch (error) {
            console.log('ERROR: '+error); 
        }
    },[]);

    return(
        <>
            <Header/>

            <div id='main-container' className='min-h-screen h-full w-full mx-au to flex flex-col items-center dark:bg-main-dark not-dark:bg-main'>
                <h1 className='mt-5 font-[phiaute] text-5xl self-center dark:text-gray-200 not-dark:text-black'>{t('Rhymes.Title')}</h1>
                <div id='grid-of-rhymes' className="grid justify-items-center grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 max-w-screen-lg mx-auto p-2">
                    {getFetchedRhymeCards()}
                </div>
            </div>
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default Rhymes;