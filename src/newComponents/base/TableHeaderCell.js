const TableHeaderCell = ({className, ...rest}) => {

    const defaultClassName = `TableHeaderCell ${className ? className : ''}`

    return (
        <th className={defaultClassName}>
            {rest.children}
        </th>
    ) 
}

export default TableHeaderCell