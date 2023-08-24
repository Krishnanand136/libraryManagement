import { Button } from "reactstrap"

const button = ({icon, onClick , className, ...rest }) => {

    const defaultClassName = `MyButton ${className ? className : ''}`
    const onButtonClick = (e) => {   
        onClick && onClick()
    }
    
    return (
        <Button className={defaultClassName} {...rest} onClick={onButtonClick}>{rest.children}</Button>
    )

}

export default button