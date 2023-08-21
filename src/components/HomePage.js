import React, { useEffect, useState, useRef } from "react";

import checked from "../images/checked.png"
import { useSelector, useDispatch  } from "react-redux";

import { bindActionCreators } from "redux";
import allActions from "../state/actions"
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap' 
import useToggle from "../components/hooks/useToggle"

import { sortAOB } from "../utils/jsUtils"
import { AgGridReact } from 'ag-grid-react'
import { useLocation, Link } from "react-router-dom";

export default function HomePage() {

    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const [ rowData, setRowData ] = useState(null)
    const { addToWishList, requestBook } = bindActionCreators(allActions, dispatch)
    const { user, books } = state
    const [ wishListArrivals, setWishListArrivals ] = useState(null)
    const [ showWLA , toggleWLA ] = useToggle()
    const location =  useLocation()


    const columnDefs = [
        {
            field: 'isbn',
            maxWidth: 250,
            sortable: true,
            filter: true,
            resizable: true,
            headerClass: "grid-cell-centered",
            headerStyle: { textAlign : "center"},
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
            field: 'author',
            maxWidth: 245,
            sortable: true,
            filter: true,
            resizable: true,
            cellClass: "grid-cell-centered"
        },
        {
            headerName: "Wishlist",
            maxWidth: 205,
            sortable: true,
            filter: true,
            resizable: true,
            cellClass: "grid-cell-centered",
            cellRenderer: (field) => {
                const isBookOwned = user?.books.filter(item => item.isbn === field.data.isbn).length > 0
                const wishListStatus = user?.wishlist.filter(item => item.isbn === field.data.isbn)?.[0]?.status
                        
                const isBookWishListed = wishListStatus ? wishListStatus === "wishlisted" ? true : false : false
                const isBookRequested =  wishListStatus ? wishListStatus === "requested" ? true : false : false
                const isBookRejected =  wishListStatus ? wishListStatus === "rejected" ? true : false : false
                
                return (
                    isBookOwned || isBookWishListed || isBookRequested || isBookRejected
                        ? 
                    <img
                        alt="logo"
                        src={checked}
                        style={{
                            height: 32,
                            width: 32,
                            marginRight: 10,
                        }}
                    /> 
                        :
                    <Button onClick={()=> addToWishList({isbn: field.data.isbn})}>WishList</Button>
                )
            }
        },
        {
            headerName: "",
            maxWidth: 205,
            sortable: true,
            filter: true,
            resizable: true,
            cellClass: "grid-cell-centered",
            cellRenderer: (field) => {
                const isBookOwned = user?.books.filter(item => item.isbn === field.data.isbn).length > 0
                const wishListStatus = user?.wishlist.filter(item => item.isbn === field.data.isbn)?.[0]?.status
                        
                const isBookRequested =  wishListStatus ? wishListStatus === "requested" ? true : false : false

                return(
                    isBookOwned
                        ?
                        <img
                        alt="logo"
                        src={checked}
                        style={{
                            height: 32,
                            width: 32,
                            marginRight: 10,
                        }}
                    /> 
                        :
                    field.data.issued 
                        ?
                    "ISSUED"
                        
                        :
                    isBookRequested
                        ?
                    "REQUESTED"
                        :
                    <Button onClick={()=> requestBook({isbn : field.data.isbn})}>Get Book Now</Button>
                )
            }
        },
    ] 

    useEffect(()=>{
        books.length && setRowData(sortAOB(books, "isbn").filter(el => el.status !== 'deleted'))
    }, [books])


    useEffect(()=>{
        if(!user) return

        let userWishList = []
        for(let i = 0; i < user.wishlist.length; i++){
            let item = user.wishlist[i]
            let isBookAvaliable = books.filter(el => el.isbn === item.isbn && el.issued === false && item.status !=="requested").length > 0
            isBookAvaliable && userWishList.push(item)
        }

        userWishList.length && setWishListArrivals(userWishList) 
    },[])

    useEffect(()=>{
        if(wishListArrivals?.length && location.state?.from === "login"){
            toggleWLA()
        }
    },[ wishListArrivals ])

    

    return(
        <div className="routes ag-theme-alpine w-100">
            <AgGridReact
                rowData={rowData}
                rowHeight={60}
                columnDefs={columnDefs}
            />
            <Modal isOpen={showWLA} toggle={toggleWLA}>
                <ModalHeader toggle={toggleWLA}>Wishlisted Books</ModalHeader>
                <ModalBody>
                    <h2>{`These Books are available now :)`}</h2>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            wishListArrivals?.map((el, index) => { 
                                const book = books?.filter(item => item.isbn === el.isbn)[0]
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{book?.title}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                    <Link to="/wishlist">My WishList</Link>
                </ModalBody>  
            </Modal>
        </div>
    )
}