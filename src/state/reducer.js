import { users, books, getLanguage } from "../data/data"
import { pick, omit, randomString  } from "../utils/jsUtils"

const initialState = {
    users,
    books,
    language : 'en-US',
    loginSubmited: false
}

const userLogin = (state) => {
    return { ...state, loginSubmited: true, language: getLanguage(navigator.language) }
}


const adminLogin = (state, payLoad) => {
    return { ...state, admin: payLoad, language: getLanguage(navigator.language) }
}

const adminLogout = (state) => {
    let newState = {
        ...state,
        users: [
            ...state.users.filter(el => el.userType !== 'admin'),
            state.admin
        ]
    }
    return { ...omit(newState, ["admin"]) }
}

const userLogout = (state) => {
    let newState = {
        ...state,
        users: [
            ...state.users.filter(el => el.userId !== state.user.userId),
            state.user
        ]
    }
    return { ...omit(newState, ["user"]) }
}

const deleteBook = (state, payLoad) => {
    return {
        ...state,
        books: [
            ...state.books.filter(el => el.isbn !== payLoad.isbn),
            {
                ...state.books.filter(el => el.isbn === payLoad.isbn)[0],
                status: "deleted"
            }
        ]
    }

}

const addToWishList = (state, payLoad) => {
    return{
        ...state,
        user:{
            ...state.user,
            wishlist: [
                ...state.user.wishlist,
                {
                    isbn: payLoad.isbn,
                    status: 'wishlisted'
                }
            ]
        }
    }
}

const requestBook = (state, payLoad) => {
    const { user } = state
    const admin = state.users.filter(el =>  el.userType === 'admin')[0]

    let wishListBook = user.wishlist.filter(el => el.isbn === payLoad.isbn)[0]

    wishListBook = wishListBook ? wishListBook : { status: 'requested', isbn: payLoad.isbn }

    const newUser = {
        ...user,
        wishlist: [ 
            ...user.wishlist.filter(el => el.isbn !== payLoad.isbn),
            {
                ...wishListBook,
                status: 'requested',
            }
        ]
    }

    const newAdmin = {
        ...admin,
        issueRequests: [
            ...admin.issueRequests,
            {
                issueId: randomString(16, '#aA'),
                isbn: payLoad.isbn,
                userId: user.userId,
            }
        ]
    }

    return {
        ...state,
        user: newUser,
        users: [
            ...state.users.filter(el => el.userType !== 'admin'),
            newAdmin
        ]
    }


}

const removeFromWishList = (state, payLoad) => {
    const { user } = state
    const admin = state.users.filter(el =>  el.userType === 'admin')[0]
    console.log("WishList Action User :", user, payLoad)

    const newUser = {
        ...user,
        wishlist: [ 
            ...user.wishlist.filter(el => el.isbn !== payLoad.isbn),
        ]
    }

    const issueRequest = admin.issueRequests.filter(el => el.isbn === payLoad.isbn && el.userId === user.userId)[0]
    const newAdmin = {
        ...admin,
        issueRequests: admin.issueRequests.filter(el => el.issueId !== issueRequest?.issueId),
    }

    return {
        ...state,
        user: newUser,
        users: [
            ...state.users.filter(el => el.userType !== 'admin'),
            issueRequest ? newAdmin : admin
        ]

    }
}

const issueBook = (state, payLoad) => {

    const { admin, books, users } = state
    const book =  books.filter(el => el.isbn === payLoad.isbn)[0]
    const user = users.filter(el => el.userId === payLoad.userId)[0]

    if(user.books.length > 3){
        alert('Can issue only 3 books at once')
        return
    }

    const newUser = {
        ...user,
        wishlist: user.wishlist.filter(el => el.isbn !== payLoad.isbn),
        book: user.books.push({
            isbn: payLoad.isbn,
            issueId: payLoad.issueId
        })
    }

    const newBooks = [
        ...books.filter(el => el.isbn !== payLoad.isbn),
        {
            ...book,
            issued: true
        }
    ]

    const newAdmin = {
        ...admin,
        issueRequests: [
            ...admin.issueRequests.filter(el => el.issueId !== payLoad.issueId)
        ]
    }

    return {
        ...state,
        books: newBooks,
        admin: newAdmin,
        users: [
            ...users.filter(el => el.userId !== payLoad.userId && el.userType !== 'admin'),
            newAdmin, 
            newUser
        ]
    }

}

const rejectIssue = (state , payLoad) => {

    const { admin, users } = state

    const user = users.filter(el => el.userId === payLoad.userId)[0]
    const wish = user.wishlist.filter(el=> el.isbn === payLoad.isbn)[0]

    const newUsers = [
        ...users.filter(el => el.userId !== user.userId),
        {
            ...user,
            wishlist: [
                ...user.wishlist.filter(el => el.isbn !== payLoad.isbn),
                {
                    ...wish,
                    status: 'rejected'
                }
            ]
        }
    ]


    const newAdmin = {
        ...admin,
        issueRequests: [
            ...admin.issueRequests.filter(el => el.issueId !== payLoad.issueId)
        ]
    }

    return {
        ...state,
        users: newUsers,
        admin: newAdmin
    }


}

const returnBook = (state, payLoad) => {
    const { user, books } = state

    const newUser = {
        ...user,
        books: user.books.filter(el => el.isbn !== payLoad.isbn)
    }

    const newBooks = [
        ...books.filter(el => el.isbn !== payLoad.isbn),
        {
            ...books.filter(el => el.isbn === payLoad.isbn)[0],
            issued: false
        }
    ]

    return {
        ...state,
        user: newUser,
        books: newBooks
    }


}

const languageChange = (state) => {
    return { ...state,  language: getLanguage(navigator.language) }
}


const reducer = (state = initialState, action) => { 

    switch(action.type){

        case "userLogin":
            return userLogin(state, action.payLoad)

        case "adminLogin":
            return adminLogin(state, action.payLoad)

        case "adminLogout":
            return adminLogout(state)

        case "userLogout":
            return userLogout(state)

        case "deleteBook":
            return deleteBook(state, action.payLoad)

        case "addToWishList": 
            return addToWishList(state, action.payLoad)

        case "requestBook":
            return requestBook(state, action.payLoad)

        case "removeFromWishList":
            return removeFromWishList(state, action.payLoad)
        
        case "issueBook":
            return issueBook(state, action.payLoad)

        case "rejectIssue":
            return rejectIssue(state, action.payLoad)

        case "returnBook":
            return returnBook(state, action.payLoad)
        
        case "languageChange":
            return languageChange(state)

        default:
            return state
    }
}

export default reducer