import { Input } from "reactstrap"
const input = ({className, children, ...rest}) => {
    console.log(rest)
    const defaultClassName = `FormInput ${className ? className : ''}`

    return (
        <Input {...rest} className={defaultClassName}>
            {children}
        </Input>
    ) 
}

export default input