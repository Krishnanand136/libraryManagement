
const SideDrawer = ({ show, className , ...rest}) => {
    const defaultClassName = `SideDrawer ${className ? className : ''}`
    return(
        show &&
        <div className={defaultClassName}>
            {rest.children} 
        </div>
    )
}

export default SideDrawer