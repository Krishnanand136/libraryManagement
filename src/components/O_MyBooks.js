import React, { useEffect, useState } from "react";
// import {books, users} from '../data/json'
import NavBar from './NavBar';
import Books from "./Books";
import { useLocation, useNavigate } from "react-router-dom";
import back from '../images/left-arrows.png'
import { randomString } from "../utils/jsUtils";


export default function MyBooks() {

    const location = useLocation()
    const navigate = useNavigate()
    const [ user, setUser ] = useState(null)
    const [ admin, setAdmin ] = useState(null)
    const [ users, setUsers ] = useState(null)
    const [ books, setBooks ] = useState(null)

    const handleLogout = () => {
        navigate('/', { state: { users, books } })
    }

    const handleGoToAllBooks =  () => {
        navigate('/homepage', { state : { users: users, books: books, userId: user.userId}})
    }

    // const handleGB = (book) => {
        
    //     let wishListBook = user.wishlist.filter(el => el.isbn === book.isbn)[0]
    //     wishListBook = wishListBook ? wishListBook : { status: 'requested', isbn: book.isbn, }

    //     setUser({
    //         ...user,
    //         wishlist: [ 
    //             ...user.wishlist.filter(el => el.isbn !== book.isbn),
    //             {
    //                 ...wishListBook,
    //                 status: 'requested',
    //             }
    //         ]
    //     })

    //     setAdmin({
    //         ...admin,
    //         issueRequests: [
    //             ...admin.issueRequests,
    //             {
    //                 issueId: randomString(16, '#aA'),
    //                 isbn: book.isbn,
    //                 userId: user.userId,
    //             }
    //         ]
    //     })

    // }

    // const handleRFWL = (book) => {
    //     setUser({
    //         ...user,
    //         wishlist: [ 
    //             ...user.wishlist.filter(el => el.isbn !== book.isbn),
    //         ]
    //     })
    //     const issueRequest = admin.issueRequests.filter(el => el.isbn === book.isbn && el.userId === user.userId)[0]
    //     issueRequest && setAdmin({
    //         ...admin,
    //         issueRequests: admin.issueRequests.filter(el => el.issueId !== issueRequest.issueId),
    //     })
    // }

    const handleReturn = (book) => {
        console.log(book)
        setUser({
            ...user,
            books: user.books.filter(el => el.isbn !== book.isbn)
        })
        setBooks([
            ...books.filter(el => el.isbn !== book.isbn),
            {
                ...books.filter(el => el.isbn === book.isbn)[0],
                issued: false
            }
        ])
    }

    useEffect(() => {
        if(!location.state){
            navigate('/')
        }else{ 
            console.log("MyBooks location state : ", location.state)
            setUser(location.state.users.filter(el => el.userId === location.state.userId)[0])
            setUsers(location.state.users)
            setBooks(location.state.books)
        }
    }, [])

    useEffect(() => {
        if(!location.state){
            navigate('/')
        }else{     
            console.log("MyBooks location state : ", location.state)
            setUser(location.state.users.filter(el => el.userId === location.state.userId)[0])
            setAdmin(location.state.users.filter(el => el.userType === 'admin')[0])
            setUsers(location.state.users)
            setBooks(location.state.books)
        }
    }, [])

    useEffect(()=>{

        if(user && admin){
            console.log("sertting users");
            setUsers([
                ...users.filter(el => el?.userId !== user.userId && el.userId !== '1'),
                admin,
                user,
            ])
        }
    },[ user, admin ])

    useEffect(()=> {
        console.log("\n\n\nUsers ============================ \n", users)
        console.log("Books ============================ \n", books)
    },[users, books])

    return(
        <div className="routes">
            <NavBar user={user} users={users} books={books} handleLogout={handleLogout} listType={"My Books"}/>
            <img
                onClick={()=>handleGoToAllBooks()}
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
            <Books bookList={user?.books} books={books} handleReturn={handleReturn} booksType={"MyBooks"}/>
        </div>
    )
}
