import React, { useEffect }  from "react";
import wishlist from '../images/wishlist.png'
import myBooks from '../images/book.png'
import { Button, Navbar, NavbarBrand } from "reactstrap";
import logo from "../logo.svg"

import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../state/actions"


export default function NavBar({ pageName }) {

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()
    const { user, state } = useSelector((state) => { return { user: state.user, state: state } });
    const { userLogout } = bindActionCreators(allActions, dispatch)


    const handleNavigate = (page) => {
        page === 'wishlist' && location.pathname !== '/wishlist' && navigate('/wishlist')
        page === 'myBooks' && location.pathname !== '/myBooks' && navigate('/myBooks')
    }

    const handlelogout = () => {
        userLogout(user?.userId)
        navigate('/')
    }

    useEffect(()=>{
        !user && navigate('/')
    },[user])

    useEffect(() => console.log(`\n\n\n\n${pageName} : \n`, state), [state])

    return (
            <div className="NavBar w-100">
                    <img alt="logo"src={logo}
                        style={{
                            height: 40,
                            width: 40
                        }}
                    />
                
                <div>
                    <img
                        onClick={()=>handleNavigate('myBooks')}
                        alt="logo"
                        src={myBooks}
                        style={{
                            height: 50,
                            width: 35,
                            marginRight: 32,
                            cursor: 'pointer'
                        }}
                    />

                    <img
                        onClick={()=>handleNavigate('wishlist')}
                        alt="logo"
                        src={wishlist}
                        style={{
                            height: 32,
                            width: 32,
                            marginRight: 32,
                            cursor: 'pointer'
                        }}
                    />
                    
                    <Button onClick={()=>handlelogout()}>
                        Logout
                    </Button>
                </div>
            </div>
    )
}