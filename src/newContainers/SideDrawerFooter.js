const SideDrawerFooter = ({ className, ...rest}) => {
    const defaultClassName = `SideDrawerFooter ${className ? className : ''}`
    return (
        <div className={defaultClassName}>
            {rest.children}
        </div>
    )
}

export default SideDrawerFooter