import { useNavigate } from "react-router-dom";
import type { HomepageAnnouncementTitleType } from "../types/types";
import { apiFetch } from "../utils/api";

function AdminAnnoucementRow(props: HomepageAnnouncementTitleType) {
    const navigate = useNavigate();
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete the announcement "${props.title}"? This action cannot be undone.`)) {
            try {
                const res = await apiFetch(`/announcement/${props.id}`, {
                    method: 'DELETE',
                });
                if(res.status === 200){
                    alert('Announcement deleted successfully');
                    navigate('/hoann'); // Refresh the page after deletion
                }else{
                    const errorData = await res.json();
                    const errorMessage = errorData.message || 'Unknown error';
                    alert(`Failed to delete announcement, message: ${errorMessage}`);
                }
            } catch (e) {
                alert('An error occurred while deleting the announcement.');
            }
        }else{
            return;            
        }
    };
    return (
        <>
            <tr className="h-8">
                <td className='border-e-2 border-header dark:border-header-dark text-center ps-2 cursor-pointer' onClick={() => navigate(`/announcement/${props.id}`)}>{props.title}</td>
                <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{props.createdAt.getFullYear()}.{props.createdAt.getMonth() + 1}.{props.createdAt.getDate()}</td>
                <td className='text-center'>
                    <button className='mx-2 px-2 py-1/2 bg-green-500 dark:bg-green-600 text-element dark:text-element-dark rounded' onClick={() => navigate(`/announcement/${props.id}`)}>{`Edit`}</button>
                    <button className='mx-2 px-2 py-1/2 bg-red-500 dark:bg-red-600i text-element dark:text-element-dark rounded' onClick={handleDelete}>{`Delete`}</button>
                </td>
            </tr>
        </>
    );
}

export default AdminAnnoucementRow  ;