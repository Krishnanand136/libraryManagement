import AdminHome from '../newComponents/pages/adminHome'
import { pageNames } from '../utils/constants'

const BaseBodyContainer = ({className, pageName, pageProps}) => {

    const defaultClassName = `BaseBodyContainer ${className ? className : ''}`

    const page = () => {
        switch(pageName){
            case pageNames.ADMIN_HOME:
                return <AdminHome {...pageProps}/>
        }
    }


    return (
        <>
        {page()}

        </>
    )
           
}

export default BaseBodyContainer