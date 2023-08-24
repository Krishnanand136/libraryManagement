import ArgusLogo from "../../images/argus-logo.png"
import Menu1 from "../../images/myBooks.png"
import Search from "../../images/Search-Default.png"
import Help from "../../images/Help-Default.png"
import Notification from "../../images/Notification-Default.png"
import User from "../../images/User-Default.jpg"
import TypoGraphy from "../base/TypoGraphy"
import { useLocation, useNavigate } from "react-router-dom"
import IconButton from "../base/IconButton"
import DropDownIcon from "../../images/dropdown.png"
import DropDownMenu from "../base/DropDownMenu"
import useToggle from "../../hooks/useToggle.js"

//------------------------------------------//
const NavBarBrand = ({className, ...props}) => {
    return (
        <img
            className={`NavBar-Brand ${className ? className : ''}`}
            src={ArgusLogo}
        />
    )
}

const LeftMenuItem = ({name, icon, selected, onClick ,className, dropDown, dropDownItems}) => {
    const defaultClassName = `LeftMenuItem ${className ? className : ''} ${ selected ? 'LeftMenuItem-Selected' : ''} ${dropDown && 'DropDown'}`

    if(dropDown){
        onclick = () => {
            toggleDropDown()
            onClick && onClick()
        }
    }else{
        onclick = () => {
            onClick && onClick()
        }
    }

    return (
        <div className={defaultClassName} onClick={onclick}>
            <div className="d-flex">
                <IconButton icon={icon}/>
                <TypoGraphy text={name}/>
                {dropDown && <IconButton icon={DropDownIcon} variant="small"/>}
            </div>
            {dropDown && <DropDownMenu items={dropDownItems} showDropDown={showDropDown}/>}
        </div>
    )
}

const NavBarLeftSection = ({className, menuItems}) => {
    const defaultClassName = `NavBarLeftSection ${className ? className : ''}`

    return (
        <div className={defaultClassName}>
            <NavBarBrand/>
            <div className="MenuBar">
                {
                    menuItems.map((el,index) => 
                        <LeftMenuItem key={index} name={el.name} icon={el.icon} onClick={el.onClick} selected={el.selected} dropDown={el.dropDown} dropDownItems={el.dropDownItems}/>
                    )
                }
            </div>
            
        </div>
        
    )
}
//------------------------------------------//



//------------------------------------------//
const RightMenuItem = ({name, icon, selected, className}) => {
    const defaultClassName = `RightMenuItem ${className ? className : ''}`
    return (
        <div className={defaultClassName}>
            <img
                src={icon}
                className="MenuItem-icon"
            />
        </div>
    )
}

const NavBarRightSection = ({className, menuItems}) => {
    const defaultClassName = `NavBarRightSection ${className ? className : ''}`

    return (
        <div className={defaultClassName}>
            <div className="MenuBar">
                {
                    menuItems.map((el,index) => 
                        <RightMenuItem key={index} icon={el.icon} />
                    )
                }
            </div>
        </div>
        
    )
}
//------------------------------------------//


const NavBar = ({className, ...rest}) => {

    const defaultClass = `NavBar-Container ${className ? className : ''}`
    const location = useLocation()
    const navigate = useNavigate()

    const leftMenuItems = [
        {
            name: 'All Books',
            icon: Menu1,
            route: 'allBooks',
            selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'allBooks',
            show: true,
            dropDown : true,
            dropDownItems : [
                {
                    name: 'All Books',
                    icon: Menu1,
                    route: 'allBooks',
                    selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'allBooks',
                    onClick: () => {
                        if(location.pathname !== '/admin/allBooks')
                            navigate('/admin/allBooks')
                    },
                },
                {
                    name: 'Issue Requests',
                    icon: Menu1,
                    route: 'issueRequests',
                    selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'issueRequests',
                    onClick: () => {
                        if(location.pathname !== '/admin/issueRequests')
                            navigate('/admin/issueRequests')
                    }
                }

            ]


        },
        {
            name: 'Issue Requests',
            icon: Menu1,
            route: 'issueRequests',
            selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'issueRequests',
            onClick: () => {
                if(location.pathname !== '/admin/issueRequests')
                    navigate('/admin/issueRequests')
            }

        }
    ]

    const rightMenuItems = [
        {
            name: 'Search',
            icon: Search,
        },
        {
            name: 'Help',
            icon: Help,
        },
        {
            name: 'Notification',
            icon: Notification,
        },
        {
            name: 'User',
            icon: User,
        }

    ]

    
    return(
        <div className={defaultClass}>
            <NavBarLeftSection menuItems={leftMenuItems}/>
            <NavBarRightSection menuItems={rightMenuItems}/>            
        </div>
    )
}

export default NavBar