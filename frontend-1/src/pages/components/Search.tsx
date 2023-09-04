import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./searchBar.css"

interface SearchBarProps {
    value : string;
    onChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({value, onChange} : SearchBarProps) => {
    
    return (
        <div className="search-bar">
            <div className="input-wrapper">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input placeholder="Type to search..." value={value} onChange={onChange}/>
            {/* <button type="submit" className="search-button"> */}
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}Search
            {/* </button> */}
            </div>
        </div>
    )
}

export default SearchBar
