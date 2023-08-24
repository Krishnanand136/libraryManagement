const TypoGraphy = ({className, text, ...rest}) => {

    const defaultClassName = `TypoGraphy ${className ? className : ''}`

    return(
        <div className={defaultClassName} {...rest}>
            {text}
        </div>
    )
}

export default TypoGraphy