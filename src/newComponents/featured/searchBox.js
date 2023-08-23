import IconButton from "../base/IconButton"
import Search from "../../images/Search-Default.png"
const searchBox = ({className, handleSearch}) => {

    const onChange = () => {}

    return(
        <div className="search-box">
            <IconButton icon={Search} className="mag"/>
            <input className="search-input" placeholder="Search" onChange={handleSearch ? handleSearch : onChange}/>
        </div>
    )
   
}

export default searchBox