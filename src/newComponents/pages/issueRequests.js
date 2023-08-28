import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../../state/actions"
import Grid from "../featured/grid";
import SearchBox from "../featured/searchBox"
import PageHeader from "../base/pageHeader"
import PageBody from  "../base/pageBody"
import TypoGraphy from "../base/TypoGraphy"
import Button from "../base/Button"

const IssueRequests = ({className}) => {

    const defaultClassName = `BodyContainer ${className ? className : ''}`

    const dispatch = useDispatch()
    const { books, admin, users } = useSelector((state) => state);
    const { issueBook, rejectIssue } = bindActionCreators(allActions, dispatch)

    const [ rowData, setRowData ] = useState(null)
    const [ gridApi, setGridApi] = useState(null)

    const columnDefs = [
        {
            field: 'isbn',
            headerStyle: { textAlign : "center"},
            flex: 1.5
            
        },
        {
            field: 'title',
            flex: 2.5
        },
        {
            headerName: 'User Name',
            valueGetter: (params) => users.filter(item => item.userId === params.data.userId)?.[0]?.['userName'],
            flex: 1
        },
        {
            field: 'author',
            flex: 2
        },

        {
            field: 'issued',
            valueGetter : (field) => field.data.issued ? "YES" : "NO",
            maxWidth: 90
        },
        {
            cellRenderer: (field) => {
                return <Button disabled={field.data.issued || field.data.status === 'deleted'} onClick={()=>issueBook(field.data)}>Issue</Button>
            }
        },
        {
            cellRenderer: (field) => {
                const { data } = field
                return <Button onClick={()=>rejectIssue(field.data)}>Reject</Button>
            }
        },
    ] 
    const handleSearch = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }   



    useEffect(()=>{
        const newRowData = admin?.issueRequests?.map(el => {
            return{
                ...books.filter(item => item.isbn === el.isbn)[0],
                ...el,
            }
        })

        admin?.issueRequests && setRowData(newRowData)
    }, [admin])




    return (
        <div className={defaultClassName}>
            <PageHeader>
                <TypoGraphy text={"All Books"} className="PageHeader-Text"/>
                <SearchBox handleSearch={handleSearch}/>
            </PageHeader>
            <PageBody>
                    <Grid
                        setGridApi={setGridApi}
                        rowData={rowData}
                        columnDefs={columnDefs}
                    />
            </PageBody>
        </div>
    )
           
           
}



export default IssueRequests