import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch  } from "react-redux";

import { bindActionCreators } from "redux";
import allActions, { adminLogout } from "../state/actions"
import { Button } from "reactstrap"
import { AgGridReact } from 'ag-grid-react'
import { useNavigate } from "react-router-dom";
import back from "../images/left-arrows.png"

export default function IssueBooks() {

    const dispatch = useDispatch()
    const { admin, books, users } = useSelector((state) => state);
    const [ rowData, setRowData ] = useState(null)
    const { rejectIssue, issueBook } = bindActionCreators(allActions, dispatch)
    const navigate = useNavigate()

    const columnDefs = [
        {
            field: 'isbn',
            maxWidth: 250,
            sortable: true,
            filter: true,
            resizable: true,
            valueGetter: (field) => {
                const book = books.filter(item => item.isbn === field.data.isbn)[0] 
                return book.isbn
            }         
        },
        {
            field: 'title',
            maxWidth: 400,
            sortable: true,
            filter: true,
            resizable: true,
            sort: true,
            cellClass: "grid-cell-centered",
        },
        {
            field: 'userName',
            maxWidth: 245,
            sortable: true,
            filter: true,
            resizable: true,
            cellClass: "grid-cell-centered"
        },
        {
            headerName: "Issued",
            maxWidth: 100,
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (field) => {
                return field.data.issued ? "Yes" : "No"
            }
        },
        {
            headerName: "",
            maxWidth: 300,
            sortable: true,
            filter: true,
            resizable: true,
            cellRenderer : (field) => 
                <>
                    <Button style={{width: "100px", marginRight: "10px"}} disabled={field.data.issued || field.data.status === 'deleted'} onClick={()=>issueBook(field.data)}>Issue</Button>
                    <Button style={{width: "100px"}} onClick={()=>rejectIssue(field.data)}>Reject</Button>
                </>
            
        },
    ] 

    useEffect(()=>{

        admin && setRowData(
                admin.issueRequests.map(el => {
                    return {
                        ...el,
                        ...books.filter(item => item.isbn === el.isbn)[0],
                        ...users.filter(item => item.userId === el.userId)[0]
                    }
                }),
            )

    }, [admin, books])


    return(
        <div className="routes ag-theme-alpine w-100">
            <img
                onClick={()=> navigate('/admin')}
                alt="logo"
                src={back}
                style={{
                    height: 32,
                    width: 32,
                    marginRight: 10,
                    cursor: 'pointer',
                    justifySelf: 'end'
                }}
            />
            <AgGridReact
                rowData={rowData}
                rowHeight={60}
                columnDefs={columnDefs}
            />
        </div>
    )
}