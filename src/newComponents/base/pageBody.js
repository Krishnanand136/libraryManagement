const pageBody = ({ className, children }) => {

    const defaultClassName = `PageBody ${className ? className : ''}`
    return(
        <div className={defaultClassName}>
            {children}
        </div>
    )
   
}

export default pageBody