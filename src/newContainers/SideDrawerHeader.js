const SideDrawerHeader = ({className, ...rest}) => {
    const defaultClassName = `SideDrawerHeader ${className ? className : ''}`
    return (
        <div className={defaultClassName}>
            {rest.children}
        </div>
    )
}

export default SideDrawerHeader


