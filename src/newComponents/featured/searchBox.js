import IconButton from "../base/IconButton"
import Search from "../../images/Search-Default.png"
const searchBox = ({className, placeholder ,handleSearch}) => {

    const onChange = () => {}

    return(
        <div className="search-box">
            <IconButton icon={Search} className="mag"/>
            <input className="search-input" placeholder={placeholder} onChange={handleSearch ? handleSearch : onChange}/>
        </div>
    )
   
}

export default searchBox