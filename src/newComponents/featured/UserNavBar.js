import ArgusLogo from "../../images/argus-logo.png"
import Menu1 from "../../images/myBooks.png"
import Search from "../../images/Search-Default.png"
import Help from "../../images/Help-Default.png"
import Notification from "../../images/Notification-Default.png"
import User from "../../images/User-Default.jpg"
import TypoGraphy from "../base/TypoGraphy"
import { useLocation, useNavigate } from "react-router-dom"
import IconButton from "../base/IconButton"


//------------------------------------------//
const NavBarBrand = ({className, ...props}) => {
    return (
        <img
            className={`NavBar-Brand ${className ? className : ''}`}
            src={ArgusLogo}
        />
    )
}

const LeftMenuItem = ({name, icon, selected, onClick ,className}) => {
    const defaultClassName = `LeftMenuItem ${className ? className : ''} ${ selected ? 'LeftMenuItem-Selected' : ''}`

    const onclick = () =>{
        onClick && onClick()
    }

    return (
        <div className={defaultClassName} onClick={onclick}>
            <IconButton icon={icon}/>
            <TypoGraphy text={name}/>
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


const UserNavBar = ({className, ...rest}) => {

    const defaultClass = `NavBar-Container ${className ? className : ''}`
    const location = useLocation()
    const navigate = useNavigate()

    const leftMenuItems = [
        {
            name: 'All Books',
            icon: Menu1,
            route: 'allBooks',
            selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'homepage',
            onClick: () => {
                if(location.pathname !== '/homepage')
                    navigate('/homepage')
            }

        },
        {
            name: 'MyBooks',
            icon: Menu1,
            route: 'myBooks',
            selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'myBooks',
            onClick: () => {
                if(location.pathname !== '/myBooks')
                    navigate('/myBooks')
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

export default UserNavBar