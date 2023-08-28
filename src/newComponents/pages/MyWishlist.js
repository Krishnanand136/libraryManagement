import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../../state/actions"
// import { Button } from "reactstrap"
import { sortAOB } from "../../utils/jsUtils"
import SearchBox from "../featured/searchBox"
import PageHeader from "../base/pageHeader"
import PageBody from  "../base/pageBody"
import TypoGraphy from "../base/TypoGraphy"
import useToggle from "../../hooks/useToggle"
import CardHolders from "../../newContainers/CardHolders";
import Table from "../base/Table"
import TableCell from "../base/TableCell"
import TableBody from "../base/TableBody"
import TableRow from "../base/TableRow"
import SideDrawerFooter from "../../newContainers/SideDrawerFooter";
import SideDrawerBody from "../../newContainers/SideDrawerBody";
import SideDrawerHeader from "../../newContainers/SideDrawerHeader"
import CloseIconButton from "../../newComponents/derived/CloseIconButton"
import SideDrawer from "../../newContainers/SideDrawer"
import ImageContainer from "../featured/ImageContainer"
import Card from "../../newContainers/Card"
import BookCard from "../featured/BookCard"
import Button from "../base/Button"


const WishListButton = ({books, selectedBook, requestBook, removeFromWishList }) => {
    const book = books.find(el => el?.isbn === selectedBook?.isbn)
    const isBookRequested = selectedBook.status === 'requested'
    const isBookIssued = book.issued

    console.log(books, selectedBook)
    return(
        <>
            <Button disabled={isBookIssued || isBookRequested} size='md' outline onClick={() => requestBook(selectedBook)}>{isBookRequested ? "Requested" : isBookIssued ? "Issued" : "Request"}</Button>
            <Button size='md' outline onClick={()=>removeFromWishList(selectedBook)}>Remove</Button>
        </>
    )

}


const MyWishList = ({className}) => {

    const defaultClassName = `BodyContainer ${className ? className : ''}`

    const dispatch = useDispatch()
    const { user, books } = useSelector((state) => state);
    const { removeFromWishList, requestBook } = bindActionCreators(allActions, dispatch)

    const [ showSideDrawer, toggleSideDrawer, openSideDrawer, closeSideDrawer ] = useToggle()

    const [ selectedRow, setSelectedRow ] = useState(null)
    const [ rows, setRows ] = useState(null)


    const handleSideDrawerToggle = (rowData) => {
        setSelectedRow(rowData);

        if(!selectedRow){
            openSideDrawer()
            return
        }

        if(selectedRow.isbn === rowData.isbn){
            toggleSideDrawer()
        }else{
            openSideDrawer()
        }

    }



    useEffect(()=>{

        const newWishList = user?.wishlist.map(el=>{
            return {  ...books.filter(item => item.isbn === el.isbn)[0], ...el }
        })

        let tempRows = []
        let tempBooks = newWishList ? [...newWishList.slice(0,12)] : []



        let i = 0
          while( i<tempBooks.length + 3){
            tempRows.push(tempBooks.slice(i, i+3))
            i = i+3
          }
          setRows(tempRows)


    },[user])

    useEffect(()=>{
        console.log("\n\n\n", user)
    },[user])


    return (
        <div className={defaultClassName}>
            <PageHeader>
                <TypoGraphy text={"My WishList"} className="PageHeader-Text"/>
            </PageHeader>
            <PageBody className='p-3'>
                <CardHolders>
                    {
                        rows?.map((el) => 
                            <div className="card-holder-row">
                                {
                                    el.map((item) => 
                                        <Card>
                                            <BookCard book={item} bookCardKnowMore={()=>{handleSideDrawerToggle(item)}}/>
                                        </Card>
                                    )
                                }
                            </div>
                        )
                    }
                </CardHolders>
            </PageBody>    
            <SideDrawer show={showSideDrawer} className='HomePageSideDrawer'>
                <SideDrawerHeader>
                    <TypoGraphy text={selectedRow?.title}/>
                    <CloseIconButton toggle={toggleSideDrawer}/>
                </SideDrawerHeader>
                <SideDrawerBody>
                    <ImageContainer height={200} width={180} src={selectedRow?.imageUrl}/>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TypoGraphy text="Title"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text=":"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy multiLine text={selectedRow?.title}/>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <TypoGraphy text="ISBN"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text=":"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text={selectedRow?.isbn}/>
                                </TableCell>
                            </TableRow>
                            
                            <TableRow>
                                <TableCell>
                                    <TypoGraphy text="Author"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text=":"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy multiLine text={selectedRow?.author}/>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <TypoGraphy text="Description"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text=":"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy multiLine text={selectedRow?.description}/>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </SideDrawerBody>
                <SideDrawerFooter className="justify-content-end">


                    <WishListButton books={books} selectedBook={selectedRow} removeFromWishList={() => {removeFromWishList(selectedRow); toggleSideDrawer()}} requestBook={()=>{requestBook(selectedRow); toggleSideDrawer()}}/>
                </SideDrawerFooter>
            </SideDrawer>       
        </div>
    )
           
}

export default MyWishList
