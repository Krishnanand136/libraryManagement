
import TypoGraphy from "../base/TypoGraphy"
import IconButton from "../base/IconButton";
import ImageContainer from "../featured/ImageContainer"
import View from "../../images/info.png"
const BookCard = ({className, book,...rest}) =>{
    const defaultClassName = `${className ? className : ''}`
    return(
        <>
            <ImageContainer className='book-card-image image-borders' src={book?.imageUrl} height={104} width={88}/>
            <div className="card-holder-inner-container">
                <TypoGraphy className='book-card-title' text={book?.title }/>
                <TypoGraphy className='book-card-text' text={book?.author}/>

                <div className="card-holder-author-date">
                    <TypoGraphy className='book-card-text' text={(new Date(book?.published)).toISOString().substring(0, 10)}/>
                    <IconButton icon={View} onClick={rest.bookCardKnowMore}/>
                </div>
            </div>
        </>
    )


}

export default BookCard