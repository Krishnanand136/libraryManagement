import { FormGroup } from "reactstrap"
const formGroup = ({className, direction, ...rest}) => {

    const defaultClassName = `FormGroup ${className ? className : ''} ${ direction ?  direction === 'row'? `flex-row` : `flex-column`  : `flex-row`}`
    console.log(direction)
    return (
        <FormGroup className={defaultClassName}>
            {rest.children}
        </FormGroup>
    ) 
}

export default formGroup