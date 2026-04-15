import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "../utils/api";
import { validateEmail } from "../misc/misc";
import { useTranslation } from "react-i18next";

interface UserContextType {
    type: number,
    nickname: string,
    lastLoginAt: Date | null,
    handleLogout: () => void;
    handleLogin: (email:string, password:string) => void;
}

export const UserContext = createContext<UserContextType|undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode})=>{
    const [t] = useTranslation();
    const [type, setType] = useState(-1);
    const [nickname, setNickname] = useState("");
    const [lastLoginAt, setLastLoginAt] = useState<Date|null>(null);

    const handleLogout = async () => {
        try {
            const res = await apiFetch(`/user/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(res.status === 200){
                localStorage.removeItem('token');
                localStorage.removeItem('nickname');
                localStorage.removeItem('lastLoginAt');
                setType(-1);
                setNickname("");
                setLastLoginAt(null);
                return true;
            }else{
                return false;
            }
        } catch (e) {
            console.error('Error logging out:', e);
        }
    }

    const handleLogin = async (email:string, password:string) => {
        // Wait for implementation
        if(!email || !password){
            alert(t('UserManagement.General.FillAllFields'));
            return;
        }
        if(!validateEmail(email)){
            alert(t('UserManagement.General.EmailError'));
            return;
        }
        try {
            const res = await apiFetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if(res.status === 200){
                const token = data.token;
                const user = data.user;
                if(token){
                    setType(user.type==='1'?1:0);
                    setLastLoginAt(new Date(user.lastLoginAt));
                    localStorage.setItem('token', token);
                    setNickname(user.nickname);
                    localStorage.setItem('nickname', user.nickname);
                    alert(t(`UserManagement.Login.${data.message}`));
                }
            }else if(res.status === 401){
                alert(t(`UserManagement.Login.${data.message}`));
            }else if(res.status === 403){
                alert(t(`UserManagement.Login.${data.message}`));
            }else{
                alert(t(`UserManagement.Login.${data.message}: ${data.error}`));
            }
        } catch (e) {
            alert(t(`UserManagement.Login.user_login_failed`)+`: ${(e as Error).message}`);
        }
    };
    const fetchUserData = async () => {
            
        try {
            const res = await apiFetch(`/user/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'user' }),
            });
            if(res.status === 200){
                const data = await res.json();
                const user = data.user;
                setType(user.type==='1'?1:0);
                localStorage.setItem('nickname', user.nickname);
                localStorage.setItem('lastLoginAt', user.lastLoginAt);
                setNickname(user.nickname);
                setLastLoginAt(new Date(user.lastLoginAt));
                type;nickname;lastLoginAt;
            }else if(res.status===400){
                //console.log('Not logged in');
                localStorage.removeItem('nickname');
                setNickname("");
                setType(-1);
            }else if(res.status===401){
                localStorage.removeItem('nickname');
                setNickname("");
                setType(-1);
                localStorage.removeItem('token');
            }else{
                localStorage.removeItem('nickname');
                setNickname("");
                setType(-1);
            }
        } catch (e) {
            setNickname("");
            setType(-1);
            localStorage.removeItem('nickname');
            //console.log('Not logged in');
        }
    }

    useEffect(()=>{
        const pNickname = localStorage.getItem('nickname');
        const pLastLoginAt = localStorage.getItem('lastLoginAt'); 
        if(pNickname === null){
            setType(-1);
        }else{
            setType(0);
            setNickname(pNickname);
        }
        if(pLastLoginAt)
            setLastLoginAt(new Date(pLastLoginAt));

        fetchUserData(); 
    },[]);

    useEffect(()=>{
        const pNickname = localStorage.getItem('nickname');
        const pLastLoginAt = localStorage.getItem('lastLoginAt'); 
        if(pNickname === null){
            setType(-1);
        }else{
            setType(0);
            setNickname(pNickname);
        }
        if(pLastLoginAt)
            setLastLoginAt(new Date(pLastLoginAt));
    },[type, nickname])
    return (<UserContext.Provider value={{type, nickname, lastLoginAt, handleLogout, handleLogin}}>
            {children}
        </UserContext.Provider>)
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) throw new Error ('useUser must be sed within UserProvider');
    return context;
}