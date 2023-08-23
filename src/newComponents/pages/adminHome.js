import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../../state/actions"
import { Button } from "reactstrap"
import { sortAOB } from "../../utils/jsUtils"
import Grid from "../featured/grid";
import SearchBox from "../featured/searchBox"
import PageHeader from "../base/pageHeader"
import PageBody from  "../base/pageBody"
import TypoGraphy from "../base/TypoGraphy"

const AdminHome = ({className}) => {

    const defaultClassName = `BodyContainer ${className ? className : ''}`

    const dispatch = useDispatch()
    const { admin, books } = useSelector((state) => state);
    const { deleteBook } = bindActionCreators(allActions, dispatch)

    const [ rowData, setRowData ] = useState(null)
    const [ gridApi, setGridApi] = useState(null)

    const columnDefs = [
        {
            field: 'isbn',
            maxWidth: 200,
            headerStyle: { textAlign : "center"},
        },
        {
            field: 'title',
            maxWidth: 350,
        },
        {
            field: 'author',
            maxWidth: 320,
        },
        {
            field: 'published',
            cellDataType: "date",
            maxWidth: 350,
            filter: "agDateColumnFilter",
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    if (cellValue == null) {
                        return 0;   
                    }
                    const cellDate = new Date(cellValue.getFullYear(), cellValue.getMonth(), cellValue.getDate());
                    // Now that both parameters are Date objects, we can compare
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    } else if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    }
                    return 0;
                },
            },
            resizable: true,
            sort: true,
            valueGetter: (params) => new Date(params.data.published),
            valueFormatter: (params) => {
                if(params.value === null)
                    return ''

                const formatter = new Intl.DateTimeFormat(navigator.language);

                return formatter.format(params.value);

                // return `${ date<10 ? `0${date}`: date }-${ month<10 ? `0${month+1}`: month+1  }-${year}
            },
            getQuickFilterText : (params) => {
                if(params.value === null)
                    return ''
                const formatter = new Intl.DateTimeFormat(navigator.language);
                console.log("Date : ", formatter.format(params.value))
                return formatter.format(params.value);
            }
        },
        {
            field: 'issued',
            maxWidth: 200,
            valueGetter : (field) => field.data.issued ? "YES" : "NO",
        },
        {
            maxWidth: 250,
            cellRenderer: (field) => {
                const { data } = field
                return <Button disabled={data.status === 'deleted'} onClick={()=> deleteBook({isbn : data.isbn})}>Delete</Button>
            }
        },
    ] 



    const handleSearch = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }   


    useEffect(()=>{
        books.length && setRowData(sortAOB(books, "isbn"))
    }, [books])




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



export default AdminHome