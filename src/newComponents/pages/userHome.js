import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useLocation, Link } from "react-router-dom";
import allActions from "../../state/actions"
import { sortAOB } from "../../utils/jsUtils"
import Grid from "../featured/grid";
import SearchBox from "../featured/searchBox"
import PageHeader from "../base/pageHeader"
import PageBody from  "../base/pageBody"
import TypoGraphy from "../base/TypoGraphy"
import MyButton from "../base/Button"
import Info from "../../images/info.png"
import IconButton from "../base/IconButton";
import SideDrawer from "../../newContainers/SideDrawer"
import useToggle from "../../hooks/useToggle"
import ImageContainer from "../featured/ImageContainer"
import SideDrawerFooter from "../../newContainers/SideDrawerFooter";
import SideDrawerBody from "../../newContainers/SideDrawerBody";
import SideDrawerHeader from "../../newContainers/SideDrawerHeader"
import CloseIconButton from "../../newComponents/derived/CloseIconButton"

import Table from "../base/Table"
import TableCell from "../base/TableCell"
import TableBody from "../base/TableBody"
import TableRow from "../base/TableRow"
import TableHeaderCell from "../base/TableHeaderCell"
import TableHead from "../base/TableHead"
import checked from "../../images/checked.png"
import { Modal, ModalHeader, ModalBody } from 'reactstrap' 
import { messages } from "../../data/data";


const WishListButton = ({field, user, addToWishList, grid, language}) => {
    
    const isBookOwned = user?.books?.filter(item => item.isbn === field.isbn).length > 0
    const wishListStatus = user?.wishlist?.filter(item => item.isbn === field.isbn)?.[0]?.status
            
    const isBookWishListed = wishListStatus ? wishListStatus === "wishlisted" ? true : false : false
    const isBookRequested =  wishListStatus ? wishListStatus === "requested" ? true : false : false
    const isBookRejected =  wishListStatus ? wishListStatus === "rejected" ? true : false : false
    return (
        isBookOwned || isBookWishListed || isBookRequested || isBookRejected
            ? 
                grid 
                    ? 
                <IconButton
                    alt="logo"
                    icon={checked}
                    
                /> 
                    : 
                <MyButton disabled onClick={()=> addToWishList({isbn: field.isbn})}>{messages.wishlist[language]}</MyButton>
                
            :
        <MyButton onClick={()=> addToWishList({isbn: field.isbn})}>{messages.wishlist[language]}</MyButton>
    )
}

const GetBookButton = ({field, user, requestBook, grid, language}) => {
    const isBookOwned = user?.books.filter(item => item.isbn === field.isbn).length > 0
    const wishListStatus = user?.wishlist.filter(item => item.isbn === field.isbn)?.[0]?.status
            
    const isBookRequested =  wishListStatus ? wishListStatus === "requested" ? true : false : false

    return(


        grid
            ? 
            isBookOwned
                ?
            <IconButton
                alt="logo"
                icon={checked}
                
            /> 
                :
            field.issued 
                ?
            messages.issued[language]
                :
            isBookRequested
                ?
            messages.requested[language]
                :
            <MyButton onClick={()=> requestBook({isbn : field.isbn})}>{messages.getBookNow[language]}</MyButton>

            :


            isBookOwned
                ?
            <MyButton disabled onClick={()=> requestBook({isbn : field.isbn})}>{messages.getBookNow[language]}</MyButton>
            
                :
            field.issued 
                ?
            <MyButton disabled onClick={()=> requestBook({isbn : field.isbn})}>{messages.issued[language]}</MyButton>
                :
            isBookRequested
                ?
            <MyButton disabled onClick={()=> requestBook({isbn : field.isbn})}>{messages.requested[language]}</MyButton>
                :
            <MyButton onClick={()=> requestBook({isbn : field.isbn})}>{messages.getBookNow[language]}</MyButton>

    )
}


const UserHome = ({className}) => {

    const defaultClassName = `BodyContainer ${className ? className : ''}`

    const state = useSelector((state) => state);
    const [ rowData, setRowData ] = useState(null)
    const dispatch = useDispatch()
    const { addToWishList, requestBook } = bindActionCreators(allActions, dispatch)
    const { user, books, language } = state
    const [ wishListArrivals, setWishListArrivals ] = useState(null)
    const [ showWLA , toggleWLA ] = useToggle()
    const location =  useLocation()


    const [ gridApi, setGridApi] = useState(null)
    const [ showSideDrawer, toggleSideDrawer, openSideDrawer, closeSideDrawer ] = useToggle()

    const [ selectedRow, setSelectedRow ] = useState(null)

    const columnDefs = [
        {
            cellRenderer: (params) => {
                return <IconButton icon={Info} onClick={() => handleSideDrawerToggle(params.data)}/>
            },
            filter: false,
            maxWidth: 70,
            resizable: false,
        },
        {
            headerName: messages.ISBN[language],
            field: 'title',
            flex: 5,
        },
        {
            headerName: messages.author[language],
            field: 'author',
            cellRenderer: (params) => {
                return <TypoGraphy className='overflow' text={params.value}/>
            },
            flex: 3
        },
        {
            field: 'published',
            headerName: messages.published[language],
            cellDataType: "date",
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
                return formatter.format(params.value);
            },
            maxWidth: 150,
            resizable: false,
            flex:2,
        },
        {
            headerName: messages.issued[language],
            field: 'issued',
            valueGetter : (field) => field.data.issued ? messages.yes[language] : messages.no[language],
            maxWidth: 100,
            resizable: false

        },
        {
            cellRenderer: (field) => <WishListButton grid language={language} field={field.data} user={user} addToWishList={addToWishList}/>,
            maxWidth: 150,
            minWidth: 150,
            resizable: false

        },
        {
            cellRenderer: (field) => <GetBookButton grid language={language} field={field.data} user={user} requestBook={requestBook}/>,
            maxWidth: 150,
            minWidth: 150,
            resizable: false
        },
    ] 

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

    const handleSearch = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }   

    useEffect(()=>{
        books.length && setRowData(sortAOB(books.filter(el => el.status !== 'deleted'), "isbn"))
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


    return (
        <div className={defaultClassName}>
            <PageHeader>
                <TypoGraphy text={"All Books"} className="PageHeader-Text"/>
                <SearchBox placeholder={messages.search[language]} handleSearch={handleSearch}/>
            </PageHeader>
            <PageBody className='flex-column'>
                    <Grid
                        gridApi={gridApi}
                        setGridApi={setGridApi}
                        rowData={rowData}
                        columnDefs={columnDefs}
                    />
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
                                    <TypoGraphy text={messages.title[language]}/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text=":"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text={selectedRow?.title} multiLine/>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <TypoGraphy text={messages.ISBN[language]}/>
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
                                    <TypoGraphy text={messages.author[language]}/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text=":" multiLine/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy text={selectedRow?.author}/>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <TypoGraphy text={messages.description[language]}/>
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
                    <WishListButton field={selectedRow} user={user} language={language} addToWishList={addToWishList}/>
                    <GetBookButton field={selectedRow} user={user} language={language} requestBook={requestBook}/>
                </SideDrawerFooter>
            </SideDrawer>
            <Modal isOpen={showWLA} toggle={toggleWLA}>
                <ModalHeader toggle={toggleWLA}>{messages.wishlistedBooks[language]}</ModalHeader>
                <ModalBody>
                    <h2>{messages.availableBooks[language]}</h2>
                    <Table striped>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>#</TableHeaderCell>
                                <TableHeaderCell>{messages.title[language]}</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            wishListArrivals?.map((el, index) => { 
                                const book = books?.filter(item => item.isbn === el.isbn)[0]
                                return (
                                    <TableRow key={index}>
                                        <TableCell scope="row">{index+1}</TableCell>
                                        <TableCell>{book?.title}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        </TableBody>
                    </Table>
                    <Link to="/myWishList">{messages.myWishList[language]}</Link>
                </ModalBody>  
            </Modal>
           
        </div>
    )
           
}

export default UserHome