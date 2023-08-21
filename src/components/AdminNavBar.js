import React, { useEffect } from "react";
import { Button, Navbar, NavbarBrand } from "reactstrap";
import logo from "../logo.svg"
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


    useEffect(() => {
        !admin && navigate("/")
    },[admin])

    useEffect(() => console.log(`\n\n\n\n${pageName} : \n `, state), [state])


    const handleNavigate = (page) => {
        page === 'issueRequests' && location.pathname !== '/issueRequests' && navigate('/issueRequests')
    }

    return (
        <Navbar className="NavBar w-100" color="dark" dark>
            <NavbarBrand>
            <img alt="logo"src={logo}
                style={{
                    height: 40,
                    width: 40
                }}
            />
                {`${pageName} - ${admin?.userName}`}
            </NavbarBrand>
            
            <div>
                <img
                    onClick={()=>handleNavigate('issueRequests')}
                    alt="logo"
                    src={issueRequests}
                    style={{
                        height: 32,
                        width: 32,
                        marginRight: 32,
                        cursor: 'pointer'
                    }}
                />
                <Button onClick={()=>adminLogout()}>
                    Logout
                </Button>
            </div>
        </Navbar>
    )
}