import React, { useState,useEffect } from 'react';
import API from '../api/api';

import "../styles/LeftMenu.css";
import { FaSignOutAlt,FaClipboardList,FaTools,FaEllipsisV, FaUser} from 'react-icons/fa';
import {useHistory,NavLink} from "react-router-dom";

export default function LeftMenu(props) {
  const level = 0;
  const history = useHistory();

  const [selectedPage, setSelectedPage] = useState(history.location.pathname);


  const handleLogout = async (event)=>{
    await API.logout();
    props.setUser(null);
    history.push("/login");

  }
  useEffect(() => {
    setSelectedPage(history.location.pathname);
  });
 
  return (
    <div className={"leftMenu"}>
      <div className={"logout"} onClick={handleLogout}>
        <FaSignOutAlt/>
      </div>
      <div className={"emp"}>
        <img src={require("../imgs/emp.jpg")} />
        <div className={"name"}>{props.user.name}</div>
        {props.user.level===0  && <div className={`level`}>Admin</div>}
      </div>
      <div className={"mnu"}>
        {props.user.level===0 && <NavLink key={"admin"} exact to={"/admin"} onClick={()=>{setSelectedPage("admin")}} >
          <div className={"item"}>
            {selectedPage.search("admin")>-1 && <div className={"selected"}></div>}
            <div className={"title"}><span className={"icon"}><FaTools /></span> Admin</div>
          </div>
        </NavLink>}
        <NavLink key={"employeesList"} exact to={"/employeesList"} onClick={()=>{setSelectedPage("employeesList")}} >
          <div className={"item"}> 
            {selectedPage.search("employeesList")>-1 && <div className={"selected"}></div>}
            
            <div className={"title"}><span className={"icon"}><FaClipboardList /></span> Employees List</div>
          </div>
        </NavLink>
        <NavLink key={"employeeView"} exact to={"/employeeView"} onClick={()=>{setSelectedPage("employeeView")}} >
          <div className={"item"}> 
            {selectedPage.search("employeeView")>-1 && <div className={"selected"}></div>}
            
            <div className={"title"}><span className={"icon"}><FaUser /></span> Employe</div>
          </div>
        </NavLink>
        <div className={"bottomtext"}>Employees Review Test</div>
      </div>
    </div>
  );
}