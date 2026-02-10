export default function Button({children,type="submit",style="primary",onClick,className=""}){
    return(
        <button onClick={onClick} type={type} className={`btn-${style} ${className}`}>
            {children}
        </button>
    )
}