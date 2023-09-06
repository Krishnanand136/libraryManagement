import { Button } from "react-bootstrap" 
import { getButtonComponentClass } from "../../data/styling"
const theme = 'secondary'


const button = ({className, outline=true , small=true, ...rest }) => {

    const defaultClassName = `${getButtonComponentClass(theme, outline, small)} ${className ? className : ''} `;
    
    return (
        <Button {...rest} className={defaultClassName} {...rest} >
            {rest.children}
        </Button>
    )
}

export default button