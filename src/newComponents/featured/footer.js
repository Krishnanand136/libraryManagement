import React from "react"


export default function ({}){
    return(
        <div
            className="w-100"
            style={{
                height: 32,
                paddingLeft: 64,
                paddingRight: 64
            }}
        >  
            <div
                className="w-100 h-100 d-flex flex-row justify-content-between"
                style={{
                    paddingLeft: 16,
                    paddingRight: 16
                }}
            >   
                <div className="copyrights-text d-flex flex-row align-items-center">
                    Powered by TransUnion LLC
                </div>
                <div className="privacy-policy d-flex flex-row align-items-center">
                    Privacy Policy
                </div>
            </div> 

        </div>
    )
}