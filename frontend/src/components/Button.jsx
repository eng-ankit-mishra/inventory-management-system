export default function Button({children,type="primary",onClick}){
    return(
        <button onClick={onClick} className={`btn-${type}`}>
            {children}
        </button>
    )
}