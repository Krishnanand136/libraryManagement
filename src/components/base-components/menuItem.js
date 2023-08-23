import React from "react"

export default function ({menuIcon, menuName, selected}){
    return(
        <div className="d-flex flex-row align-items-center h-100 menu-item" 
            style={ 
                selected ? 
                {
                    borderBottom: "2px solid #FCD800",
                }
                :
                {} 
            }
        >
            <img alt="logo"src={menuIcon}
                style={{
                    height: 24,
                    width: 24,
                    marginRight: 8
                }}
            />
            <p className="m-0 menu-item-text">{menuName}</p>
        </div>
    )
}