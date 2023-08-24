import { Form } from "reactstrap"
const form = ({className, ...rest}) => {

    const defaultClassName = `Form ${className ? className : ''}`

    return (
        <Form className={defaultClassName}>
            {rest.children}
        </Form>
    ) 
}

export default form