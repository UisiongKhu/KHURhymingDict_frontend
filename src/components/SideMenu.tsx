import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type propType = {
    className?: string,
    isAdmin?: boolean,
}

function SideMenu(prop: propType){
    const navigate = useNavigate();
    const [t] = useTranslation();
    const PageNameListArray = t<'SideMenu.PageNameList', { returnObjects: true }, string[]>('SideMenu.PageNameList', { returnObjects: true }).map(v=>v);
    if(!prop.isAdmin){
        PageNameListArray.pop();
    }
    const PageNameLinkArray = t<'SideMenu.PageLinkList', { returnObjects: true }, string[]>('SideMenu.PageLinkList', { returnObjects: true }).map(v=>v);
    if(!prop.isAdmin){
        PageNameLinkArray.pop();
    }
    const getPageNameListBtns = () => {
        return PageNameListArray.map((value,index)=>(
            <>
                <button className={`${index===PageNameListArray.length-1?'rounded-br-md':''} hover:cursor-pointer w-full p-5 font-[phiaute] text-left text-element dark:text-element-dark hover:bg-header-hover dark:hover:bg-header-hover-dark text-2xl`} onClick={()=>{navigate(PageNameLinkArray[index])}}>{value}</button>
            </>
        ));
    };

    return(
        <>
            <div className={`${prop.className!==undefined?prop.className:''} flex flex-col`}>
                {getPageNameListBtns()}
            </div>
        </>
    )

}

export default SideMenu;