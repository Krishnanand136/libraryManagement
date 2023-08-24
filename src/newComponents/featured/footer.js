import TypoGraphy from "../base/TypoGraphy"

export default function ({className, ...rest}){
    const defaultClassName = `footer ${className ? className : ''}`
    return(
        <div className={defaultClassName}>  
            {rest.children}
        </div>
    )
}