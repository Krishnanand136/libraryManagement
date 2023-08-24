const TableCell = ({className, ...rest}) => {

    const defaultClassName = `TableCell ${className ? className : ''}`

    return (
        <td className={defaultClassName}>
            {rest.children}
        </td>
    ) 
}

export default TableCell