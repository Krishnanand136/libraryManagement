import { DropdownButton } from "react-bootstrap" 
import { getButtonComponentClass } from "../../data/styling"
import Button from '../base/Button'
import IconButton from "./IconButton"
const theme = 'secondary'


const dropDownButton = ({className,  title, outline=true, small=true, ...rest }) => {
    const defaultClassName = `${getButtonComponentClass(theme, outline, small)} ${className ? className : ''} `;
    return (
        <Button {...rest} className={defaultClassName} {...rest} >
            {rest.title}
            <IconButton 
                src=''
            />
        </Button>
    )
}

export default dropDownButton