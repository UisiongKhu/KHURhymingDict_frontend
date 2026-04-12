import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "../utils/api";

interface StatContextType {
    totalVisitors: number,
    searchCounter: number,
    syllableCounter: number,
    wordCounter: number,
    dataSourceAmount: number,
}

export const StatContext = createContext<StatContextType|undefined>(undefined);

export const StatProvider = ({children}: {children: ReactNode}) =>{
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [searchCounter, setSearchCounter] = useState(0);
    const [syllableCounter, setSyllableCounter] = useState(0);
    const [wordCounter, setWordCounter] = useState(0);
    const [dataSourceAmount, setDataSourceAmount] = useState(0);
    

    useEffect(()=>{
        const tv = localStorage.getItem('totalVisitors');
        const sc = localStorage.getItem('searchCounter');
        const slc = localStorage.getItem('syllableCounter');
        const wc = localStorage.getItem('wordCounter');
        const dsa = localStorage.getItem('dataSourceAmount');
        if(tv)
            setTotalVisitors(Number.parseInt(tv));
        if(sc)
            setSearchCounter(Number.parseFloat(sc));
        if(slc)
            setSyllableCounter(Number.parseFloat(slc));
        if(wc)
            setWordCounter(Number.parseInt(wc));
        if(dsa)
            setDataSourceAmount(Number.parseInt(dsa));   
        const fetchHomepageStats = async () => {
            try {
                const statistics = await apiFetch(`/statistics/homepage`, {
                    method: 'GET',
                });
                const statsData = await statistics.json();
                // Tī chia ē-sái chhú lí statsData
                setTotalVisitors(statsData.totalVisitors);
                localStorage.setItem('totalVisitors', statsData.totalVisitors);
                setSearchCounter(statsData.searchCounter);
                localStorage.setItem('searchCounter', statsData.searchCounter)
                setSyllableCounter(statsData.syllableCounter);
                localStorage.setItem('syllableCounter', statsData.syllableCounter);
                setWordCounter(statsData.wordCounter);
                localStorage.setItem('wordCounter', statsData.wordCounter);
                setDataSourceAmount(statsData.dataSourceAmount);
                localStorage.setItem('dataSourceAmount', statsData.dataSourceAmount);
            } catch (e) {
                //console.log('Error fetching homepage statistics:', e);
            }
        };
        fetchHomepageStats();
    },[]); // Execute only when Init
    return (<StatContext.Provider value={{totalVisitors, searchCounter, syllableCounter, wordCounter, dataSourceAmount}}>
        {children}
    </StatContext.Provider>)
}

export const useStat = () => {
    const context = useContext(StatContext);
    if(!context) throw new Error('useStat must be used within StatProvider');
    return context;
};