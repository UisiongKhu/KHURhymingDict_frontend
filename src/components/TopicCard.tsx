import { useTranslation } from "react-i18next";
import type { TopicType } from "../types/types";
import { to10KCommaString } from "../misc/misc";
import HeartSVG from "../assets/heart-empty.svg?react";
import CommentSVG from "../assets/comment.svg?react";
import TimeSVG from "../assets/time.svg?react";

function TopicCard(props: TopicType){
    const [t] = useTranslation();
    return(
        <>
            <div id="topic-card-container" className="p-3 font-[iansui] flex flex-col mt-5 lg:w-lg md:w-md sm:w-xs w-xs h-40 rounded-md border-1 border-interactive dark:border-interactive-dark text-element dark:text-element-dark shadow-md shadow-interactive/50 dark:shadow-interactive-dark/50">
                <div className="flex flex-row justify-between align-middle">
                    <h1 className="text-xl">{props.title}</h1>
                    <p>{`${props.author}`}</p>
                </div>
                <p className="grow mt-1">{props.content}</p>
                <div className="grid grid-cols-3 grid-rows-none px-5">
                    <div id="topic-card-likes-container" className="flex flex-row justify-around items-center">
                        <HeartSVG className="w-5 h-5" fill={props.liked?'currentColor':'none'} />
                        {
                            (props.likesAmount!==0)?
                            (<p>{to10KCommaString(props.likesAmount)}</p>):
                            (<p>{t('Like')}</p>)
                        }
                    </div>
                    <div id="topic-card-comment-container" className="flex flex-row justify-around items-center">
                        <CommentSVG className="w-4 h-5"/>
                        {
                            (props.commentsAmount!==0)?
                            <p>{to10KCommaString(props.commentsAmount)}</p>:
                            <p>{t('Like')}</p>
                        }
                    </div>
                    <div id="topic-card-datetime-container" className="flex flex-row justify-around items-center">
                        <TimeSVG className="w-5 h-5"/>
                        <p>{props.createAt.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopicCard;