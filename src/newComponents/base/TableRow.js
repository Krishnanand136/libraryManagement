const TableRow = ({className, ...rest}) => {

    const defaultClassName = `TableRow ${className ? className : ''}`

    return (
        <tr className={defaultClassName}>
            {rest.children}
        </tr>
    ) 
}

export default TableRow