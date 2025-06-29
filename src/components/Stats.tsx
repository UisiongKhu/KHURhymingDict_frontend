type propType = {
    className?: string;
};

function Stats(prop: propType){
    return(
        <>
            <div className={prop.className!==undefined?prop.className:''}>Stats Chart Here</div>
        </>
    )
}

export default Stats;