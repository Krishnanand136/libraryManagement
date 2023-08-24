const IconButton = ({icon, onClick, className, variant}) => {

    const defaultVariant = variant ? `icon-${variant}` : ''
    const defaultClassName = `icon ${className ? className : ''} ${defaultVariant}`
    const onIconClick = (e) => {   
    }
    
    return (
        <img
            src={icon}
            className={defaultClassName}
            onClick={onClick ? onClick : onIconClick}
        />
    )

}

export default IconButton