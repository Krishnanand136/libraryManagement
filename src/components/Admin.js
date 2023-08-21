import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../state/actions"
import { Button } from "reactstrap"
import { sortAOB } from "../utils/jsUtils"
import { AgGridReact } from 'ag-grid-react'
import CustomDateComponent from './customDateComponent.js';


export default function Admin() {

    const dispatch = useDispatch()
    const { admin, books } = useSelector((state) => state);
    const { deleteBook } = bindActionCreators(allActions, dispatch)

    const [ rowData, setRowData ] = useState(null)




    const columnDefs = [
        {
            field: 'isbn',
            maxWidth: 200,
            sortable: true,
            filter: true,
            resizable: true,
            headerClass: "grid-cell-centered",
            headerStyle: { textAlign : "center"},
        },
        {
            field: 'title',
            maxWidth: 350,
            sortable: true,
            filter: true,
            resizable: true,
            sort: true,
            cellClass: "grid-cell-centered",
        },
        {
            field: 'author',
            maxWidth: 320,
            sortable: true,
            filter: true,
            resizable: true,
            cellClass: "grid-cell-centered"
        },
        {
            field: 'published',
            cellDataType: "date",
            maxWidth: 350,
            sortable: true,
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
        },
        {
            field: 'issued',
            maxWidth: 80,
            sortable: true,
            filter: true,
            resizable: true,
            valueGetter : (field) => field.data.issued ? "YES" : "NO",
            cellClass: "grid-cell-centered"
        },
        {
            maxWidth: 250,
            sortable: true,
            filter: true,
            resizable: true,
            cellClass: "grid-cell-centered",
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

    useEffect(()=>{
        books.length && setRowData(sortAOB(books, "isbn"))
    }, [books])


    return(
        <div className="routes ag-theme-alpine w-100">
            <AgGridReact
                rowData={rowData}
                rowHeight={60}
                columnDefs={columnDefs}
                pagination={true}
                components={components}
                // paginationPageSize={8}
                paginationAutoPageSize
            />
        </div>
    )
}
