import React, { useEffect, useState } from "react";
import { Button, Navbar, NavbarBrand } from "reactstrap";
import logo from "../images/argus-logo.png"
import user from "../images/User-Default.jpg"
import notificaction from "../images/Notification-Default.png"
import help from "../images/Help-Default.png"
import search from "../images/Search-Default.png"
import menuOne from "../images/view_timeline_FILL0_wght400_GRAD0_opsz48.png"
import menuTwo from "../images/token_FILL0_wght400_GRAD0_opsz48.png"
import menuThree from "../images/admin.png"

import MenuItem from "./base-components/menuItem"
import MenuItemDropDown from "./base-components/menuItemDropDown";

import issueRequests from "../images/issueRquests.png"
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../state/actions"

export default function AdminNavBar({ pageName }) {

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()
    const { admin, state } = useSelector((state) => {return { admin: state.admin, state: state } });
    const { adminLogout } = bindActionCreators(allActions, dispatch)
    
    const [selectedPage, setSelectedPage] = useState("Administration")

    useEffect(() => {
        !admin && navigate("/")
    },[admin])

    useEffect(() => console.log(`\n\n\n\n${pageName} : \n `, state), [state])


    const handleNavigate = (page) => {
        page === 'issueRequests' && location.pathname !== '/issueRequests' && navigate('/issueRequests')
    }

    return (
        <div className="NavBar w-100">
            <div className="NavBar-inner h-100 d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row h-100 align-items-center">
                    <img alt="logo"src={logo}
                        style={{
                            height: 29,
                            width: 133,
                            marginRight: 42
                        }}
                    />
                    <MenuItem menuIcon={menuOne} menuName="Menu One" selected={false}/>
                    <MenuItem menuIcon={menuTwo} menuName="Issues" selected={false}/>
                    <MenuItemDropDown menuIcon={menuThree} menuName="Administration" selected={ selectedPage === "Administration"}/>
                </div>
                <div>
                    <img
                        onClick={()=>handleNavigate('issueRequests')}
                        alt="logo"
                        src={search}
                        style={{
                            height: 32,
                            width: 32,
                            marginRight: 8,
                            cursor: 'pointer'
                        }}
                    />
                    <img
                        // onClick={()=>handleNavigate('issueRequests')}
                        alt="logo"
                        src={help}
                        style={{
                            height: 32,
                            width: 32,
                            marginRight: 8,
                            cursor: 'pointer'
                        }}
                    />
                    <img
                        // onClick={()=>handleNavigate('issueRequests')}
                        alt="logo"
                        src={notificaction}
                        style={{
                            height: 32,
                            width: 32,
                            marginRight: 8,
                            cursor: 'pointer'
                        }}
                    />
                    <img
                        onClick={()=>adminLogout()}
                        alt="logo"
                        src={user}
                        style={{
                            height: 32,
                            width: 32,
                            cursor: 'pointer'
                        }}
                    />
                    {/* <Button onClick={()=>adminLogout()}>
                        Logout
                    </Button> */}
                </div>
            </div>
        </div>
    )
}
