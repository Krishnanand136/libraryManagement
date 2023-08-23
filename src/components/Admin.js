import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../state/actions"
import { Button } from "reactstrap"
import { sortAOB } from "../utils/jsUtils"
import { AgGridReact } from 'ag-grid-react'
import CustomDateComponent from './customDateComponent.js';
import search from "../images/Search-Default.png";

export default function Admin() {

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

    const components = useMemo(() => {
        return {
          agDateInput: CustomDateComponent,
        };
    }, []);

    const handleSearch = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }   


    useEffect(()=>{
        books.length && setRowData(sortAOB(books, "isbn"))
    }, [books])




    return(

        <div className="page-container w-100 d-flex flex-column">
            <div className="page-header d-flex flex-row align-items-center justify-content-between">
                <div className="page-header-content page-header-text">
                    Admin    
                </div>
                <div className="page-header-content">
                    <div className="search-box">
                        <img
                            alt="logo"
                            src={search}
                            style={{
                                height: 32,
                                width: 32,
                                marginRight: 8,
                                cursor: 'pointer'
                            }}
                        />
                        <input className="search-input" placeholder="Search" onChange={handleSearch}/>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="rounded ag-theme-alpine w-100 h-100">
                    <AgGridReact
                        rowData={rowData}
                        rowHeight={60}
                        columnDefs={columnDefs}
                        components={components}
                        pagination={true}
                        paginationAutoPageSize={true}
                        defaultColDef={{
                            flex: 1,
                            sortable: true,
                            filter: true,
                            resizable: true,
                        }}
                        cacheQuickFilter={true}
                        onGridReady={(params) => setGridApi(params.api)}
                    />
                </div>
            </div>
        </div>





        
    )
}
