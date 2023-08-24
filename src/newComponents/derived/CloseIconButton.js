import IconButton from "../base/IconButton";
import CloseIcon from "../../images/close.png"

const CloseIconButton = ({toggle, variant ,...rest}) => {

    const defaultVariant = variant ?? 'x-small'

    return (
        <IconButton variant={defaultVariant} icon={CloseIcon} onClick={toggle}/>
    )
}

export default CloseIconButton