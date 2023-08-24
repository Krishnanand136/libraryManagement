import { Table } from "reactstrap"
const table = ({className, ...rest}) => {

    const defaultClassName = `Table ${className ? className : ''}`

    return (
        <Table className={defaultClassName}>
            {rest.children}
        </Table>
    ) 
}

export default table