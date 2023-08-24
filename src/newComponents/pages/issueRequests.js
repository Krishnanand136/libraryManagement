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
import Edit from "../../images/pencil.png"
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

const IssueRequests = ({className}) => {

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
                return <IconButton icon={Edit} onClick={()=> {setSelectedRow(params.data); openSideDrawer()}}/>
            },
            filter: false
        },
        {
            field: 'isbn',
            maxWidth: 200,
            headerStyle: { textAlign : "center"},
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
                const { data } = field
                return <MyButton disabled={data.status === 'deleted'} onClick={()=> deleteBook({isbn : data.isbn})}>Delete</MyButton>
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
            <SideDrawer show={showSideDrawer}>
                <SideDrawerHeader>
                    <TypoGraphy text={selectedRow?.title}/>
                    <CloseIconButton toggle={toggleSideDrawer}/>
                </SideDrawerHeader>
                <SideDrawerBody>
                    <ImageContainer height={200} width={180} src={selectedRow?.imageUrl}/>
                    <Form>
                        <FormGroup direction="column">
                            <FormText text="Title"/>
                            <FormInput value={selectedRow?.title}/>
                        </FormGroup>
                        <FormGroup direction="column">
                            <FormText  text="Description"/>
                            <FormInput type="textarea" value={selectedRow?.title}/>
                        </FormGroup>
                        <FormGroup direction="row">
                            <FormGroup direction="column">
                                <FormText  text="ISBN"/>
                                <FormInput value={selectedRow?.isbn}/>
                            </FormGroup>
                            <FormGroup direction="column">
                                <FormText  text="Publish Date"/>
                                <FormInput type="date" value={selectedRow && new Date(selectedRow?.published)}/>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </SideDrawerBody>
                <SideDrawerFooter className="justify-content-end">
                    <Button onClick={toggleSideDrawer}>Save</Button>
                    <Button onClick={toggleSideDrawer}>Cancel</Button>
                </SideDrawerFooter>
            </SideDrawer>
           
        </div>
    )
           
           
}



export default IssueRequests