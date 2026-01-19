import { useNavigate } from "react-router-dom";
import type { HomepageAnnouncementTitleType } from "../types/types";

function HomepageAnnouncementTitle(props: HomepageAnnouncementTitleType) {
    const navigate = useNavigate();
    return (
        <>
            <tr>
                <td className='border-e-2 border-header dark:border-header-dark text-center ps-2 cursor-pointer' onClick={() => navigate(`/announcement/${props.id}`)}>{props.title}</td>
                <td className='text-center'>{props.createdAt.getFullYear()}.{props.createdAt.getMonth() + 1}.{props.createdAt.getDate()}</td>
            </tr>
        </>
    );
}

export default HomepageAnnouncementTitle;