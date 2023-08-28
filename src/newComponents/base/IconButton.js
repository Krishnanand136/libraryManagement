const IconButton = ({icon, className, variant, ...rest}) => {

    const defaultVariant = variant ? `icon-${variant}` : ''
    const defaultClassName = `icon ${className ? className : ''} ${defaultVariant}`

    
    return (
        <img
            src={icon}
            className={defaultClassName}
            {...rest}
        />
    )

}

export default IconButton