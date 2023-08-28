const TypoGraphy = ({className, text, multiLine, ...rest}) => {

    const defaultClassName = `TypoGraphy ${className ? className : ''}${multiLine ? ' TypoGraphy-multiline': '' }`

    return(
        <div className={defaultClassName} {...rest}>
            {text}
        </div>
    )
}

export default TypoGraphy