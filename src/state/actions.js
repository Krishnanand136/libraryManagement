
const userLogin = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "userLogin",
            payLoad
        })
    }
}

const adminLogin = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "adminLogin",
            payLoad
        })
    }
}

const adminLogout = () => {
    return (dispatch) => {
        dispatch({
            type: "adminLogout",
        })
    }
}

const userLogout = () => {
    
    return (dispatch) => {
        dispatch({
            type: "userLogout",
        })
    }
}

const deleteBook = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "deleteBook",
            payLoad
        })
    }
}

const addToWishList = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "addToWishList",
            payLoad
        })
    }
}

const requestBook = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "requestBook",
            payLoad
        })
    }
}

const removeFromWishList = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "removeFromWishList",
            payLoad
        })
    }
}

const issueBook = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "issueBook",
            payLoad
        })
    }
}

const rejectIssue = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "rejectIssue",
            payLoad
        })
    }
}

const returnBook = (payLoad) => {
    return (dispatch) => {
        dispatch({
            type: "returnBook",
            payLoad
        })
    }
}

module.exports = {
    userLogin, adminLogin, userLogout, adminLogout, addToWishList, deleteBook, requestBook, removeFromWishList, issueBook, rejectIssue, returnBook
}