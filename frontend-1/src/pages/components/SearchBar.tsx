import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./SearchBar.css";
    

const SearchBar = () => {
    const [input, setInput] = useState("")

    // const fetchData = (value) => {
        
    
    return (
        <div className="search-bar">
            <div className="input-wrapper">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input placeholder="Type to search..." value={input} onChange={(e) => setInput(e.target.value)}/>
            {/* <button type="submit" className="search-button"> */}
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}Search
            {/* </button> */}
            </div>
        </div>
    )
}

export default SearchBar