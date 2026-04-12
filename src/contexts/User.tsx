import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "../utils/api";

interface UserContextType {
    type: number,
    nickname: string,
    lastLoginAt: Date | null,
    handleLogout: () => void;
}

export const UserContext = createContext<UserContextType|undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode})=>{
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

    useEffect(()=>{
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
                    setType(data.type==='1'?1:0);
                    localStorage.setItem('nickname', user.nickname);
                    localStorage.setItem('lastLoginAt', user.lastLoginAt);
                    setNickname(user.nickname);
                    setLastLoginAt(new Date(user.lastLoginAt));
                    type;nickname;lastLoginAt;
                }else{
                    //console.log('Not logged in');
                }
            } catch (e) {
                //console.log('Not logged in');
            }
        }
        fetchUserData(); 
    },[]);
    return (<UserContext.Provider value={{type, nickname, lastLoginAt, handleLogout}}>
            {children}
        </UserContext.Provider>)
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) throw new Error ('useUser must be sed within UserProvider');
    return context;
}