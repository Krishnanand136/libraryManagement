import AdminNavBar from "../newComponents/featured/AdminNavBar"
import UserNavBar from "../newComponents/featured/UserNavBar"
import Footer from "../newComponents/featured/footer"
import AdminHome from '../newComponents/pages/adminHome'
import IssueRequests from "../newComponents/pages/issueRequests"
import UserHome from "../newComponents/pages/userHome"
import MyBooks from "../newComponents/pages/myBooks"
import { pageNames } from '../utils/constants'
import TypoGraphy from "../newComponents/base/TypoGraphy"
import { userTypes } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MyWishList from "../newComponents/pages/MyWishlist"

const BaseContainer = ({pageName, pageProps, className}) => {
    const defaultClassName = `BaseContainer ${className ? className : ''}}`


    const { user, admin } = useSelector((state) => state);
    const navigate = useNavigate()

    const [ userType, setUserType ]= useState()

    const page = () => {
        switch(pageName){
            case pageNames.ADMIN_HOME:
                return <AdminHome {...pageProps}/>
            case pageNames.ISSUE_REQUESTS:
                return <IssueRequests {...pageProps}/>
            case pageNames.USER_HOME:
                return <UserHome {...pageProps}/>
            case pageNames.MY_BOOKS:
                return <MyBooks {...pageProps}/>
            case pageNames.MY_WISHLIST:
                return <MyWishList {...pageProps}/>
        }
    }

    useEffect(()=>{
        if(user || admin){
            user && setUserType('USER')
            admin && setUserType('ADMIN')
        }else{
            navigate('/')
        }
        
    }, [user, admin])

    return (
            <div className={defaultClassName}>
                {userType === 'ADMIN' && <AdminNavBar/>}
                {userType === 'USER' && <UserNavBar/>}
                {page()}
                <Footer>
                    <TypoGraphy text="Powered by TransUnion LLC" className="copyrights-text"/>      
                    <TypoGraphy text="Privacy Policy" className="privacy-policy"/>
                </Footer>
            </div>
    )
}



export default BaseContainer