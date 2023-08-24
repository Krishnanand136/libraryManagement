const TableHead = ({className, ...rest}) => {

    const defaultClassName = `TableHead ${className ? className : ''}`

    return (
        <thead className={defaultClassName}>
            {rest.children}
        </thead>
    ) 
}

export default TableHead