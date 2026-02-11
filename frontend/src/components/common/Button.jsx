export default function Button({children,type="submit",disabled=false,style="primary",onClick,className=""}){
    return(
        <button disabled={disabled} onClick={onClick} type={type} className={`btn-${style} ${className}`}>
            {children}
        </button>
    )
}