import Card from "./Card"
import BookCard from "../newComponents/featured/BookCard"
import { useState, useEffect } from "react"
const CardHolders = ({className, books, ...rest}) => {
    const defaultClassName = `card-holders ${className ? className : ''}`



    return (
        <div className={defaultClassName}>
            {rest.children}
        </div>
    )

}

export default CardHolders