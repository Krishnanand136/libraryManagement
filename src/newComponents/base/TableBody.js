const TableBody = ({className, ...rest}) => {

    const defaultClassName = `TableBody ${className ? className : ''}`

    return (
        <tbody className={defaultClassName}>
            {rest.children}
        </tbody>
    ) 
}

export default TableBody