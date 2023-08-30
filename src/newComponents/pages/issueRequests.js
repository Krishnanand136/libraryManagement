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
import { messages } from "../../data/data";
const IssueRequests = ({className}) => {

    const defaultClassName = `BodyContainer ${className ? className : ''}`

    const dispatch = useDispatch()
    const { books, admin, users, language } = useSelector((state) => state);
    const { issueBook, rejectIssue } = bindActionCreators(allActions, dispatch)

    const [ rowData, setRowData ] = useState(null)
    const [ gridApi, setGridApi] = useState(null)

    const columnDefs = [
        {
            field: 'isbn',
            headerName: messages.ISBN[language],
            headerStyle: { textAlign : "center"},
            flex: 1.5
            
        },
        {
            field: 'title',
            headerName: messages.title[language],
            flex: 2.5
        },
        {
            headerName: 'User Name',
            headerName: messages.userName[language],
            valueGetter: (params) => users.filter(item => item.userId === params.data.userId)?.[0]?.['userName'],
            flex: 1
        },
        {
            field: 'author',
            headerName: messages.author[language],
            flex: 2
        },

        {
            field: 'issued',
            headerName: messages.issued[language],
            valueGetter : (field) => field.data.issued ? messages.yes[language] : messages.no[language],
            maxWidth: 90
        },
        {
            cellRenderer: (field) => {
                return <Button disabled={field.data.issued || field.data.status === 'deleted'} onClick={()=>issueBook(field.data)}>{ messages.issue[language]}</Button>
            }
        },
        {
            cellRenderer: (field) => {
                return <Button onClick={()=>rejectIssue(field.data)}>{messages.reject[language]}</Button>
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
                <TypoGraphy text={messages.issueRequests[language]} className="PageHeader-Text"/>
                <SearchBox placeholder={messages.search[language]} handleSearch={handleSearch}/>
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