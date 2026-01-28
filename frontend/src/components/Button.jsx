export default function Button({children,type="primary"}){
    return(
        <button className={`btn-${type}`}>
            {children}
        </button>
    )
}