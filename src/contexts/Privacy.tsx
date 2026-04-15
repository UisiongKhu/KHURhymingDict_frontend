import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface PrivacyType {
    agreed: boolean,
    answered: boolean,
    handleAgree: ()=>void,
    handleReject: ()=>void,
};

export const PrivacyContext = createContext<PrivacyType|undefined>(undefined);

export const PrivacyProvider = ({children}: {children: ReactNode}) =>{
    const [agreed, setAgreed] = useState<boolean>(false);
    const [answered, setAnswered] = useState<boolean>(false);
    const handleAgree = () => {
        setAgreed(true);
        setAnswered(true);
        localStorage.setItem('policyAgreed', 'true');
        localStorage.setItem('policyAnswered', 'true');
    }
    const handleReject = () => {
        setAgreed(false);
        setAnswered(true);
        localStorage.setItem('policyAgreed', 'false');
        localStorage.setItem('policyAnswered', 'true');
    }

    useEffect(()=>{
        const lAgreed = localStorage.getItem('policyAgreed');
        const lAnswered = localStorage.getItem('policyAnswered');
        if(lAgreed!==null){
            setAgreed(lAgreed==='true');
        }
        if(lAnswered!==null){
            setAnswered(lAnswered==='true');
        }
    },[]);

    return (<PrivacyContext.Provider value={{agreed, answered, handleAgree, handleReject}}>
        {children}
    </PrivacyContext.Provider>);
};

export const usePrivacy = () => {
    const context = useContext(PrivacyContext);
    if(!context) throw new Error('usePrivacy must be used within PrivacyProvider');
    return context;
}