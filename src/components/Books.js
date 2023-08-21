import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';

export default function Books({bookList, books, requestBook, removeFromWishList, returnBook, booksType}){
    const [ rows, setRows ] = useState(null)

    useEffect(()=>{
        let tempRows = []
        let tempBooks = bookList ? [...bookList] : []
          while(tempBooks.length){
            tempRows.push(tempBooks.splice(0, 4))
          }
          setRows(tempRows)
    },[bookList])

  return (
    rows?.map((el, rowIndex) => {
      return(
        <div key={rowIndex} className='m-2 bookrow' style={{display: 'flex', justifyContent: "flex-start"}}>
            {
              el.map((item,colIndex) => {
                  const book = books.find(el => el?.isbn === item?.isbn)
                  const isBookRequested = item.status === 'requested'
                  const isBookIssued = book.issued

                  return(
                    <div className='m-4' key={`${rowIndex}-${colIndex}`}>
                        <Card className='img-card' body>
                          <CardImg width={200} height={260} src={book?.imageUrl} alt="Card image cap" className='m-0' />
                          <CardBody>
                            <CardTitle style={{fontWeight: 800, height: "40px"}}>{book?.title?.length > 50 ? `${book?.title?.substring(0, 50)}...` : book?.title}</CardTitle>
                            <br/>
                            <br/>
                            {
                              booksType === "MyBooks" 
                                ?
                                <Button  className='w-100' size='md' outline onClick={()=>returnBook(item)}>return</Button>
                                :
                                <>
                                  <Button className='w-100 mb-1' disabled={isBookIssued || isBookRequested} size='md' outline onClick={() => requestBook({isbn:book.isbn})}>{isBookRequested ? "Requested" : isBookIssued ? "Issued" : "Request"}</Button>
                                  <br/>
                                  <Button  className='w-100' size='md' outline onClick={()=>removeFromWishList({isbn : item.isbn})}>Remove</Button>
                                </>
                            }
                          </CardBody>
                        </Card>
                    </div>
                  )
                })
            }
        </div>
      )

      
    })

    // <Row>
      
    // </Row>
  );
};
