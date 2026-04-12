import { t } from "i18next";
import type { AdminUserRowType } from "../types/types";
import { apiFetch } from "../utils/api";
import { useEffect, useState } from "react";

function AdminUserRow(props: AdminUserRowType) {
    const user = props.user;
    const [tokenExists, setTokenExists] = useState(false);
    const getDateStr = (date: Date | undefined) => {
        if (!date) return 'N/A';
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };
    const handleLogoutLocal = async (id: number) => {
        if(!props.handleLogout) return;
        await props.handleLogout(id);
        setTokenExists(false);
    };
    
    useEffect(()=>{
        // Check if the token is expired based on lastLoginAt and current time, if expired, show a warning icon next to the nickname
        const isTokenExists = async () => {
            const res = await apiFetch(`/user/token/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
            }});
            if(res.status === 200){
                setTokenExists(true);
            }else{
                setTokenExists(false);
            }
        };
        isTokenExists();
    },[]);

    useEffect(()=>{},[tokenExists]);
    
    try {
        return (
            <>
                <tr className="h-8">
                    <td className='border-e-2 border-header dark:border-header-dark text-center ps-2 cursor-pointer'>{user.id}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{t(`UserManagement.General.UserType.${user.type}`)}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{t(`UserManagement.General.UserStatus.${user.status}`)}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.email}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.nickname}</td>
                    <td className={`text-${user.desc ? 'left' : 'center'} border-e-2 border-header dark:border-header-dark ps-2`}>{user.desc ? user.desc : 'N/A'}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{getDateStr(user.createdAt)}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{getDateStr(user.updatedAt)}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.mutedTo ? getDateStr(user.mutedTo) : 'N/A'}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.lastLoginAt ? getDateStr(user.lastLoginAt) : 'N/A'}</td>
                    <td className='text-center'>
                        <div className="grid grid-cols-5 gap-1 px-2">
                            {user.status===4 && (
                                <button className='px-1 py-1/2 bg-green-500 dark:bg-green-600 text-element dark:text-element-dark rounded hover:cursor-pointer' onClick={()=>{props.handleAccept && props.handleAccept(user.id)}}>{`Accept`}</button>
                            )}
                            {user.status!==4 && !tokenExists &&  (
                            <div></div>
                            )}
                            {tokenExists && (
                                <button className='py-1/2 bg-red-500 dark:bg-red-600 text-element dark:text-element-dark rounded hover:cursor-pointer' onClick={()=>handleLogoutLocal(user.id)}>{'Logout'}</button>
                            )}
                            <button className='py-1/2 bg-red-500 dark:bg-red-600 text-element dark:text-element-dark rounded hover:cursor-pointer' onClick={()=>{props.handleMute && props.handleMute(user.id, user.mutedTo ? false : true)}} >{user.mutedTo ? 'Unmute' : 'Mute'}</button>
                            <button className='py-1/2 bg-red-500 dark:bg-red-600 text-element dark:text-element-dark rounded hover:cursor-pointer' onClick={()=>{props.handleBan && props.handleBan(user.id, user.status===2 ? false : true)}}>{user.status===2 ? 'Unban' : 'Ban'}</button>
                            <button className='py-1/2 bg-interactive dark:bg-interactive-dark text-element dark:text-element-dark rounded hover:cursor-pointer' onClick={()=>{props.handleDescChange && props.handleDescChange(user.id, user.desc || '')}}>{`Edit Desc`}</button>
                            <button className='py-1/2 bg-interactive dark:bg-interactive-dark text-element dark:text-element-dark rounded hover:cursor-pointer' onClick={()=>{props.handleRoleChange && props.handleRoleChange(user.id, user.type===0?1:0)}}>{user.type===0 ? 'Promote' : 'Demote'}</button>
                        </div>
                    </td>
                </tr>
            </>
        );
    } catch (error) {
        return(<tr>
            <td>{user.id}</td>
            <td>{(error as Error).message}</td>
        </tr>)
    }
    
}

export default AdminUserRow;