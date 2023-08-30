import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../../state/actions"
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
import { messages } from "../../data/data";

const MyBooks = ({className}) => {

    const defaultClassName = `BodyContainer ${className ? className : ''}`

    const dispatch = useDispatch()
    const { user, books, language } = useSelector((state) => state);
    const { returnBook } = bindActionCreators(allActions, dispatch)

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

        let tempRows = []
        
        const newMyBooks = user?.books?.map(el=>{
            return {  ...books.filter(item => item.isbn === el.isbn)[0], ...el }
        })


        let i = 0
          while( i<newMyBooks?.length + 3){
            tempRows.push(newMyBooks?.slice(i, i+3))
            i = i+3
          }
          setRows(tempRows)
    },[user])


    return (
        <div className={defaultClassName}>
            <PageHeader>
                <TypoGraphy text={messages.myBooks[language]} className="PageHeader-Text"/>
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
                                    <TypoGraphy text={messages.title[language]}/>
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
                                    <TypoGraphy text=":"/>
                                </TableCell>
                                <TableCell>
                                    <TypoGraphy multiLine text={selectedRow?.author}/>
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
                    <Button size='md' outline onClick={()=>{ returnBook(selectedRow); closeSideDrawer() }}>{messages.return[language]}</Button>
                </SideDrawerFooter>
            </SideDrawer>       
        </div>
    )
           
}

export default MyBooks
