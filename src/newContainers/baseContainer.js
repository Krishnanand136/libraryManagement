import NavBar from "../newComponents/featured/NavBar"
import Footer from "../newComponents/featured/footer"
import BaseBodyContainer from "./baseBodyContainer"
import AdminHome from '../newComponents/pages/adminHome'
import IssueRequests from "../newComponents/pages/issueRequests"
import { pageNames } from '../utils/constants'


const BaseContainer = ({pageName, pageProps, className}) => {
    const defaultClassName = `BaseContainer ${className ? className : ''}}`

    const page = () => {
        switch(pageName){
            case pageNames.ADMIN_HOME:
                return <AdminHome {...pageProps}/>
            case pageNames.ISSUE_REQUESTS:
                return <IssueRequests {...pageProps}/>
        }
    }


    return (
            <div className={defaultClassName}>
                <NavBar/>
                {page()}
                <Footer/>
            </div>
    )
}



export default BaseContainer