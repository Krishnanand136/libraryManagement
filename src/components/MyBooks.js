import React, { useEffect, useState, useRef } from "react";

import checked from "../images/checked.png"
import { useSelector, useDispatch  } from "react-redux";

import { bindActionCreators } from "redux";
import allActions from "../state/actions"
import Books from "./Books";
import { useNavigate } from "react-router-dom";
import back from '../images/left-arrows.png'


export default function MyBooks() {

    const dispatch = useDispatch()
    const { user, books, ...state } = useSelector((state) => state);
    const { returnBook } = bindActionCreators(allActions, dispatch)
    const navigate = useNavigate()

    return(
        <div className="routes">
            <img
                onClick={()=> navigate('/homepage')}
                alt="logo"
                src={back}
                style={{
                    height: 32,
                    width: 32,
                    marginRight: 10,
                    cursor: 'pointer',
                    justifySelf: 'end'
                }}
            />
            <Books bookList={user?.books} books={books} returnBook={returnBook} booksType="MyBooks"/>
        </div>
    )
}