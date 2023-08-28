import { useEffect, useMemo } from 'react';
import CustomDateComponent from '../featured/customDateComponent';
import { AgGridReact } from 'ag-grid-react'

const Grid = ({setGridApi, defColDef,...props}) => {

    const components = useMemo(() => {
        return {
          agDateInput: CustomDateComponent,
        };
    }, []);

    const defaultProps = {
        rowHeight: 50,
        components: components,
        pagination: true,
        paginationAutoPageSize: true,
        defaultColDef: {
            flex:1,
            sortable: true,
            filter: true,
            resizable: true,
            select: false,
            sizeColumnsToFit: true,
            autoSize: true,
            ...defColDef
        },
        cacheQuickFilter:true,
        onGridReady: (params) =>{ setGridApi(params.api);},// params.api.sizeColumnsToFit()
        ...props
    }

    return(
        <div className="ag-theme-alpine w-100 h-100">
            <AgGridReact
                {   
                    ...defaultProps
                }
            />
        </div>
    )
    

}

export default Grid