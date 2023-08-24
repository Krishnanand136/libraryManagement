const SideDrawerBody = ({ className, ...rest}) => {
    const defaultClassName = `SideDrawerBody ${className ? className : ''}`
    return (
        <div className={defaultClassName}>
            {rest.children}
        </div>
    )
}

export default SideDrawerBody