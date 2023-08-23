import React from "react"
import DropDown from "../../images/dropdown.png"

export default function ({menuIcon, menuName, selected}){
    return(
        <div className="d-flex flex-row align-items-center h-100 menu-item" 
            style={ 
                selected ? 
                {
                    borderBottom: "2px solid #FCD800",
                }
                :
                {

                } 
            }
        >
            <img alt="logo"src={menuIcon}
                style={{
                    height: 24,
                    width: 24,
                    marginRight: 8
                }}
            />
            <p className="mb-0 menu-item-text mr-1">{menuName}</p>
            <img alt="logo" src={DropDown}
                style={{
                    height: 16,
                    width: 16,
                    marginRight: 8
                }}
            />
        </div>
    )
}