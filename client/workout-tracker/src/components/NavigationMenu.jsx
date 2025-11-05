import React from "react";
import { Outlet, Link } from "react-router-dom";
import'../css/NavigationMenu.css';
import { useEffect, useState } from "react";



export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000); // updates every second
    return () => clearInterval(timer);
  }, []);

  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};





export default function Navbar() {
    return (
    <div >
                
        <div className="Navbar">
            <h1 className = "date" >{ CurrentTime() }</h1>
            <Link to="/"><button className="menuButton" type="button" >Home</button></Link>
            <Link to="/create"><button className="menuButton" type="button" >Create</button></Link>
            <Link to="/history"><button className="menuButton" type="button" >History</button></Link>
            <Link to="/profile"><button className="menuButton" type="button" >Profile</button></Link>
            
        </div>

        <Outlet/>
          
    </div>
    )
}
