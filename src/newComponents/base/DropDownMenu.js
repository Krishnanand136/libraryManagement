import { DropdownItem, DropdownMenu, Dropdown } from "reactstrap"


const DropDownMenu = ({ showDropDown, className, items}) => {

    const defaultClassName = `DropDownMenu ${className ? className : ''}`
    const defaultClassNameItem = `DropDownItem`

    const onItemClick = (e) => {   
    }
    

    return (
        showDropDown &&
        <div className={defaultClassName}>
            {
                items.map(el => 
                    <div onClick={el.onClick ?  el.onClick.bind(el)  : onItemClick} className={el.className ?? defaultClassNameItem}>
                        el.name
                    </div>
                )
            }
        </div>
    )

}

export default DropDownMenu