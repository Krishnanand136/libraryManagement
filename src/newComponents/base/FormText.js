import { FormText } from "reactstrap"
import TypoGraphy from "./TypoGraphy"
const formText = ({className, text, ...rest}) => {

    const defaultClassName = `FormText ${className ? className : ''}`

    return (
        <FormText className={defaultClassName}>
            <TypoGraphy text={text}/>
        </FormText>
    ) 
}

export default formText