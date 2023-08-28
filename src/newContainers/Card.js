const Card = ({className, ...rest}) => {

    const defaultClassName = `book-card ${className ? className : ''}`
    return (
        <div className={defaultClassName} {...rest}>
                {rest.children}
        </div>
    )
}

export default Card