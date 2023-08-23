const TypoGraphy = ({className, text}) => {

    const defaultClassName = `TypoGraphy ${className ? className : ''}`

    return(
        <div className={defaultClassName}>
            {text}
        </div>
    )
}

export default TypoGraphy