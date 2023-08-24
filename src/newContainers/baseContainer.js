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


const BaseContainer = ({pageName, pageProps, className, userType}) => {
    const defaultClassName = `BaseContainer ${className ? className : ''}}`

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
        }
    }


    return (
            <div className={defaultClassName}>
                {userType === userTypes.ADMIN && <AdminNavBar/>}
                {userType === userTypes.USER && <UserNavBar/>}
                {page()}
                <Footer>
                    <TypoGraphy text="Powered by TransUnion LLC" className="copyrights-text"/>      
                    <TypoGraphy text="Privacy Policy" className="privacy-policy"/>
                </Footer>
            </div>
    )
}



export default BaseContainer