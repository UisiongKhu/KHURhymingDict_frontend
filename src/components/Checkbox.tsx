import type { CheckboxType } from "../types/types";

function Checkbox(props: CheckboxType){
    return(
        <>
            <div data-tooltip-id={props.checkboxId}>
                <input id={props.checkboxId} type="checkbox" checked={props?.checked} disabled={props?.disabled} onChange={props.onChangeFunc} className={`w-4 h-4 rounded-xl bg-main dark:bg-main-dark focus:ring-interactive dark:focus:ring-interactive-dark focus:ring-2 focus:ring-offset-1 focus:ring-offset-main dark:focus:ring-offset-main-dark ${props.className}`}></input>
                <label htmlFor={props.checkboxId} className={`text-element dark:text-element-dark ms-1 text-center self-center ${props.labelclassName}`}>{props.label}</label>
            </div>
        </>
    )
}

export default Checkbox;