export default function({pageName, isSearch, PageBody}){

    console.log(pageName)
    return (
        <div className="page-container w-100 d-flex flex-column">
            <div className="page-header d-flex flex-row align-items-center justify-content-between">
                <div className="page-header-content page-header-text">
                    {pageName}
                </div>
                <div className="page-header-content">
                    {pageName}
                </div>
            </div>
            <div className="page-body">
                <PageBody/>
            </div>
        </div>
    )
}