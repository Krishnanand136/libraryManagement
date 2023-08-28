import { Button } from "reactstrap" 

const button = ({icon , className, ...rest }) => {

    const defaultClassName = `MyButton ${className ? className : ''}`
    
    return (
        <Button className={defaultClassName} {...rest} >{rest.children}</Button>
    )

}

export default button