export default function Button({children,type="submit",style="primary",onClick}){
    return(
        <button onClick={onClick} type={type} className={`btn-${style}`}>
            {children}
        </button>
    )
}