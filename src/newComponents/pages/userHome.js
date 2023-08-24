import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../../state/actions"
// import { Button } from "reactstrap"
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
import Form from "../base/Form"
import FormGroup from "../base/FormGroup";
import FormText from "../base/FormText";
import FormInput from "../base/Input"; 
import ImageContainer from "../featured/ImageContainer"
import SideDrawerFooter from "../../newContainers/SideDrawerFooter";
import SideDrawerBody from "../../newContainers/SideDrawerBody";
import SideDrawerHeader from "../../newContainers/SideDrawerHeader"
import CloseIconButton from "../../newComponents/derived/CloseIconButton"
import Button from "../base/Button"

import Table from "../base/Table"
import TableCell from "../base/TableCell"
import TableBody from "../base/TableBody"
import TableHead from "../base/TableHead";
import TableHeaderCell from "../base/TableHeaderCell"
import TableRow from "../base/TableRow"



const UserHome = ({className}) => {

    const defaultClassName = `BodyContainer ${className ? className : ''}`

    const dispatch = useDispatch()
    const { books } = useSelector((state) => state);
    const { deleteBook } = bindActionCreators(allActions, dispatch)

    const [ rowData, setRowData ] = useState(null)
    const [ gridApi, setGridApi] = useState(null)
    const [ showSideDrawer, toggleSideDrawer, openSideDrawer, closeSideDrawer ] = useToggle()

    const [ selectedRow, setSelectedRow ] = useState(null)

    const columnDefs = [
        {
            maxWidth: 50,
            cellRenderer: (params) => {
                return <IconButton icon={Info} onClick={()=> {setSelectedRow(params.data); openSideDrawer()}}/>
            },
            filter: false
        },
        {
            field: 'title',
        },
        {
            field: 'author',
            cellRenderer: (params) => {
                return <TypoGraphy text={params.value}/>
            }
        },
        {
            field: 'published',
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
            valueGetter : (field) => field.data.issued ? "YES" : "NO",
        },
        {
            cellRenderer: (field) => {
                return <MyButton>WishList</MyButton>
            }
        },
        {
            cellRenderer: (field) => {
                return <MyButton>Get Book</MyButton>
            }
        },
    ] 

    const handleSearch = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }   

    useEffect(()=>{
        console.log(selectedRow)
    },[selectedRow])

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
                                    <TypoGraphy text={selectedRow?.title}/>
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
                                    <TypoGraphy text={selectedRow?.author}/>
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
                                    <TypoGraphy text={selectedRow?.description}/>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>



                        {/* <FormGroup direction="column">
                            <FormText text="Title"/>
                            <FormInput disabled value={selectedRow?.title}/>
                        </FormGroup>
                        <FormGroup direction="column">
                            <FormText  text="Description"/>
                            <FormInput disabled type="textarea" value={selectedRow?.title}/>
                        </FormGroup>
                        <FormGroup direction="row">
                            <FormGroup direction="column">
                                <FormText  text="ISBN"/>
                                <FormInput disabled value={selectedRow?.isbn}/>
                            </FormGroup>
                            <FormGroup direction="column">
                                <FormText  text="Publish Date"/>
                                <FormInput disabled type="date" value={ selectedRow && (new Date(selectedRow.published)).toISOString().substr(0, 10) }/>
                            </FormGroup>
                        </FormGroup>
                    </Form> */}
                </SideDrawerBody>
                <SideDrawerFooter className="justify-content-end">
                    <Button onClick={toggleSideDrawer}>WishList</Button>
                    <Button onClick={toggleSideDrawer}>Get Book Now</Button>
                </SideDrawerFooter>
            </SideDrawer>
           
        </div>
    )
           
}

export default UserHome