const pageHeader = ({ className, children }) => {

    const defaultClassName = `PageHeader ${className ? className : ''}`
    return(
        <div className={defaultClassName}>
            {children}
        </div>
    )
   
}

export default pageHeader