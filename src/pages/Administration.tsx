import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { isLocaleHanji } from "../misc/misc";
import type { HomepageAnnouncementTitleType, User, UserData } from "../types/types";
import AdminAnnoucementRow from "../components/AdminAnnouncementRow";
import AdminUserRow from "../components/AdminUserRow";

function Administration() {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [invisible, setInvisible] = useState(false);
    // User related states
    const [users, setUsers] = useState<User[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingDesc, setEditingDesc] = useState<string>('');
    // User Management Handlers
    const handleRoleChange = (id: number, type: number) => {

    };
    const handleMute = (id:number, flag: boolean) => {
        // flag: true for mute, false for unmute   
    };
    const handleBan = async (id:number, flag: boolean) => {
        if(!window.confirm(`Are you sure you want to ${flag ? 'ban' : 'unban'} this user?`)) return;
        // flag: true for ban, false for unban
        const operation = flag ? 'ban' : 'unban';
        const res = await apiFetch(`/user/ban/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ operation }),
        });
        if(res.status === 200){
            setUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, status: flag ? 2 : 0 } : user)); // Trigger re-render by creating a new array reference
            alert(`User ${operation ? 'banned' : 'unbanned'} successfully`);
        }else{
            alert(`Failed to ${operation ? 'ban' : 'unban'} user`);
        }
    };
    const handleAccept = async (id: number) => {
        if(!window.confirm(`Are you sure you want to accept this user?`)) return;
        const res = await apiFetch(`/user/accept/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(res.status === 200){
            setUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, status: 0 } : user)); // Trigger re-render by creating a new array reference
            alert('User accepted successfully');
        }else{
            alert('Failed to accept user');
        }
    };
    const handleLogout = async (id: number) => {
        const res = await apiFetch(`/user/tokenReset/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(res.status === 200){
            // Re-render the user table
            alert('User tokens reset successfully');
        }else{
            alert('Failed to reset user tokens');
        }
    };
    const handleEditUserDesc = async (id: number, oldDesc: string) => {
        if(!window.confirm('Are you sure you want to change the description of this user?')) return;
        setEditingId(id);
        setEditingDesc(oldDesc);
    };
    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditingDesc(e.target.value); 
    };
    const handleSaveDesc = async () => {
        if(editingId === null) return;
        if(!window.confirm('Are you sure you want to change the description of this user?')) return;
        const res = await apiFetch(`/user/desc/${editingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ desc: editingDesc }),
        });
        if(res.status === 200){
            setUsers(prevUsers => prevUsers.map(user => user.id === editingId ? { ...user, desc: editingDesc } : user));
            setEditingId(null);
            setEditingDesc('');
        }else{
            alert('Failed to update user description');
        }
    };
    // Announcement related states
    const [announcementData, setAnnouncementData] = useState<HomepageAnnouncementTitleType[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editingAnnouncementId, setEditingAnnouncementId] = useState<number | null>(null);
    // Announcement Management Handlers
    const handleAnnouncementEdit = async (id: number) => {
        const res = await apiFetch(`/announcement/${id}`, {
            method: 'GET',
        });
        if(res.status === 200){
            setEditMode(true);
            setEditingAnnouncementId(id);
            const announcement = await res.json();
            setTitle(announcement.title);
            setContent(announcement.content);
        }else{
            const errorData = await res.json();
            const errorMessage = errorData.message || 'Unknown error';
            alert(`Failed to fetch announcement details: ${errorMessage}`);
        }
    };
    const handleAnnouncementDelete = async (id: number) => {
        // Remove that row from the table immediately for better UX, then send delete request to backend
        setAnnouncementData(prev => prev.filter(announcement => announcement.id !== id));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch(e.target.id){
            case 'title-input':
                setTitle(e.target.value);
                break;
            case 'content-input':
                setContent(e.target.value);
                break;
        }
    };
    const handleSubmitAnnouncement = async () => {
        if(!title || !content){
            alert('Title and content cannot be empty');
            return;
        };
        if(!window.confirm(`Are you sure you want to ${editMode ? 'update' : 'create'} this announcement?`)){
            return;
        }
        const res = await apiFetch('/announcement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        if(res.status === 201){
            const newAnnouncement = await res.json();
            setAnnouncementData(prev => [newAnnouncement, ...prev]);
            setTitle('');
            setContent('');
        }else{
            const errorData = await res.json();
            const errorMessage = errorData.message || 'Unknown error';
            alert(`Failed to create announcement: ${errorMessage}`);
        }
    };
    const handleUpdateAnnouncement = async () => {
        if(!title || !content){
            alert('Title and content cannot be empty');
            return;
        };
        if(!window.confirm(`Are you sure you want to ${editMode ? 'update' : 'create'} this announcement?`)){
            return;
        }
        // Set edit mode to true, and populate the title and content input fields with the current title and content of the announcement with the given id.
        const res = await apiFetch(`/announcement/${editingAnnouncementId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        if(res.status === 200){
            const updatedAnnouncement = await res.json();
            setAnnouncementData(prev => prev.map(announcement => announcement.id === editingAnnouncementId ? updatedAnnouncement : announcement));
            setTitle('');
            setContent('');
            setEditMode(false);
            setEditingAnnouncementId(null);
        } else {
            const errorData = await res.json();
            const errorMessage = errorData.message || 'Unknown error';
            alert(`Failed to update announcement: ${errorMessage}`);
        }
    };

    useEffect(() =>{
        const checkStatus = async() => {
            if(!localStorage.getItem('token')){
                navigate('/jipcham');
                return;
            }
            const res = await apiFetch('/user/check', {
                method: 'POST', // Check if user is an admin
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'admin' }),
            });
            if(res.status === 200){
                setInvisible(true);
                console.log(await res.json());
            }else{
                navigate('/jipcham');
            }
        };
        const fetchAnnouncement = async () => {
            try {
                const _announcementData = await apiFetch(`/announcement`, {
                    method: 'GET',
                }).then(res => res.json());
                setAnnouncementData(_announcementData);
                console.log('Homepage announcement data:', _announcementData);
            } catch (e) {
                console.log('Error fetching homepage announcement titles:', e);
            }
        };
        const fetchUsers = async () => {
            try {
                const res = await apiFetch('/user', {
                    method: 'GET',
                });
                const data = await res.json();
                const userData = data.users;
                console.log(userData);
                const users: User[] = userData.map((user: UserData) => ({
                    ...user,
                    createdAt: user.created_at ? new Date(user.created_at) : undefined,
                    updatedAt: user.updated_at ? new Date(user.updated_at) : undefined,
                    mutedTo: user.mutedTo ? new Date(user.mutedTo) : null,
                    lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt) : null,
                }));
                setUsers(users);
            } catch (e) {
                alert(`Coundn't fetch user data: ${(e as Error).message}`);
            }
        };
        checkStatus();
        fetchUsers();
        fetchAnnouncement();
    },[]); // Init
    useEffect(()=>{},[announcementData]); // When announcementData changes, re-render the page (for now, we can optimize this later by only re-rendering the announcement table instead of the whole page)
    useEffect(()=>{},[users]); // When user data changes, re-render the page (for now, we can optimize this later by only re-rendering the user table instead of the whole page)
    
    return(
        <>
            <Header/>
            {invisible&& (
                <div id={'Tiāⁿ ēng ê kong lêng'} className="min-h-screen h-content bg-main dark:bg-main-dark text-element dark:text-element-dark w-content">
                    <div className="flex flex-col">
                        <h1 className='self-center text-center pt-5 ms-5 font-[phiaute] text-4xl'>{`Iōng chiá Koán lí`}</h1>
                        <div id='user-table-container' className='mt-5 self-center w-3/4 rounded-xl border-3 border-header dark:border-header-dark overflow-hidden'>
                            <table className='w-full rounded-lg'>
                                <thead className='bg-header dark:bg-header-dark'>
                                    <tr>
                                        <th className={`w-1/30 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.Id')}</th>
                                        <th className={`w-1/25 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.Type')}</th>
                                        <th className={`w-1/25 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.Status')}</th>
                                        <th className={`w-1/10 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.Email')}</th>
                                        <th className={`w-1/20 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.Nickname')}</th>
                                        <th className={`w-1/10 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.Desc')}</th>
                                        <th className={`w-1/15 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.CreatedAt')}</th>
                                        <th className={`w-1/15 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.UpdatedAt')}</th>
                                        <th className={`w-1/15 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.MutedTo')}</th>
                                        <th className={`w-1/15 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.LastLoginAt')}</th>
                                        <th className={`w-1/4 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('UserManagement.AdminPageComponents.UserTable.Action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 && <tr><td colSpan={3} className='text-center text-lg'>{"Hm, that's weird. How did you get here. :\\"}</td></tr>}
                                    {users.map((user)=>(<AdminUserRow key={`user-${user.id}`} user={user} handleAccept={()=>handleAccept} handleBan={handleBan} handleDescChange={handleEditUserDesc} handleRoleChange={handleRoleChange} handleLogout={handleLogout} />))}
                                </tbody>
                            </table>
                        </div>
                        <div id='user-table-editor-container' className="flex flex-row items-center self-center mt-5 w-3/4">
                            <div id='mute-date-selector' className="flex flex-row border-2 rounded-lg border-header dark:border-header-dark justify-between w-1/4">
                                <h3 className="text-center px-2 py-3 text-2xl font-[phiaute] bg-header dark:bg-header-dark">MUTE DATE SELECTOR</h3>
                                <input type="date" className="text-lg ms-2 mt-2 flex-grow self-center appearance-none"></input>
                            </div>
                            <div id='desc-editor' className="flex flex-grow ms-5 flex-row border-2 rounded-lg border-header dark:border-header-dark justify-between">
                                <h3 className="text-center px-2 py-3 text-2xl font-[phiaute] bg-header dark:bg-header-dark">DESCRIPTION EDITOR</h3>
                                <textarea placeholder={`Enter user description...`} value={editingDesc} onChange={handleDescChange} className="ps-2 text-lg flex-grow self-center appearance-none resize-none overflow-y-auto"></textarea>
                                <button onClick={handleSaveDesc} className="text-center  font-[phiaute] text-3xl px-10 bg-green-500 dark:bg-green-600 rounded-r-lg border-header dark:border-header-dark border-y-2 border-r-2">SAVE</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col items-center">
                        <h1 className='ms-5 font-[phiaute] text-4xl'>{`Siau sit Koán lí`}</h1>
                        <h2 className='w-3/4 mb-2 font-[phiaute] text-3xl'>{`Siau sit Lí su to͘h`}</h2>
                        <div id='News-table-container' className='rounded-xl border-3 border-header dark:border-header-dark overflow-hidden w-3/4'>
                            <table className='w-full rounded-lg'>
                                <thead className='bg-header dark:bg-header-dark'>
                                    <tr>
                                        <th className={`w-2/3 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('Homepage.News.Table.Title')}</th>
                                        <th className={`w-1/6 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{t('Homepage.News.Table.Date')}</th>
                                        <th className={`w-1/6 font-[phiaute] font-normal ${isLocaleHanji?'text-xl':'text-2xl'}`}>{`Manipulations`}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {announcementData.length === 0 && <tr><td colSpan={3} className='text-center text-lg'>{t('Homepage.News.NoAnnouncement')}</td></tr>}
                                    {announcementData.map((announcementTitle)=>{
                                        return(<AdminAnnoucementRow key={`announcement-${announcementTitle.id}`} id={announcementTitle.id} title={announcementTitle.title} createdAt={new Date(announcementTitle.createdAt)} onDeleted={handleAnnouncementDelete} onEdited={handleAnnouncementEdit}/>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <h2 className='w-3/4 mt-5 mb-2 font-[phiaute] text-3xl'>{editMode?`Phian chi̍p Siau sit`:`Khí sin ê Siau sit`}</h2>
                        <div id="add-news-container" className="flex flex-col w-3/4 outline-header dark:outline-header-dark outline-3 rounded-xl">
                            <div id="title-container" className="flex flex-row align-middle">
                                <h3 className="text-center pt-2 ps-2 w-1/4 text-2xl font-[phiaute] bg-header dark:bg-header-dark border-b-2 border-main dark:border-main-dark">Phiau tê</h3>
                                <input id={`title-input`} placeholder={`Enter Announcement Title...`} type="text" className="w-full text-lg p-2" value={title} onChange={handleChange}></input>
                            </div>
                            <div id="content-container" className="flex flex-col">
                                <h3 className="text-center ps-2 py-1.5 text-2xl font-[phiaute] bg-header dark:bg-header-dark">Bûn chiuⁿ</h3>
                                <textarea id={`content-input`} placeholder={`Enter Announcement Content...`} className="w-full h-50 p-2" value={content} onChange={handleChange}></textarea>
                            </div>
                            <div id="btn-container" className="flex flex-row justify-end">
                                {editMode && <button className="mx-2 my-2 px-10 py-2 bg-orange-500 dark:bg-orange-600 text-lg text-element dark:text-element-dark rounded hover:cursor-pointer" onClick={handleSubmitAnnouncement}>{`Cancel`}</button>}
                                {editMode && <button className="mx-2 my-2 px-10 py-2 bg-interactive dark:bg-interactive-dark text-lg text-element dark:text-element-dark rounded hover:cursor-pointer" onClick={handleUpdateAnnouncement}>{`Update`}</button>}
                                {!editMode && <button className="mx-2 my-2 px-10 py-2 bg-interactive dark:bg-interactive-dark text-lg text-element dark:text-element-dark rounded hover:cursor-pointer" onClick={handleSubmitAnnouncement}>{`Add`}</button>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer className='text-sm text-element dark:text-element-dark bg-header dark:bg-header-dark w-full h-30 fixed lg:flex hidden bottom-0 border-1 border-infobd dark:border-infobd-dark' />
        </>
    )
}

export default Administration;