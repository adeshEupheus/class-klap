import React from 'react'
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";


export const SearchBar = () => {
  return (
    <form>
        <div className='flex '>
        <TextField id="search-bar" 
         placeholder="Search" 
         className="text"
        variant="outlined"
        size="small"/>
            <IconButton type="submit"> <SearchIcon style={{ fill: "black" }} /></IconButton>
            </div>
        
    </form>
  )
}
  


export default SearchBar