import React from "react";
import { Outlet, Link } from "react-router-dom";
import'../css/NavigationMenu.css';
var today = new Date();

export default function Navbar() {
    return (
    <div >
                
        <div className="Navbar">
            <h1 className = "date" >{today.toLocaleDateString('en-US')}</h1>
            <Link to="/"><button className="menuButton" type="button" >Home</button></Link>
            <Link to="/create"><button className="menuButton" type="button" >Create</button></Link>
            <Link to="/history"><button className="menuButton" type="button" >History</button></Link>
            <Link to="/profile"><button className="menuButton" type="button" >Profile</button></Link>
            
        </div>

        <Outlet/>
          
    </div>
    )
}
