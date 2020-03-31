import React, { useState,useEffect } from 'react';

import "../styles/EmployeesView.css";
import {FaInfoCircle } from 'react-icons/fa';
import Employe from '../components/Employee';
import API from '../api/api';
import {NavLink} from "react-router-dom";
export default function EmployeesView() {
  const [emps, setEps] = useState([]);

  async function getAllEmps() {
     
    setEps(await API.getAll("employees"));
  
  };
  useEffect(() => {
    getAllEmps(); 
    return ()=>{}
  }, []);
  return (
    <div>

        <h2><span>Employees</span></h2>
        {emps.map((e,index)=><NavLink key={index+"tag"}  to={`/employeeView/${e.id}`}  ><Employe e={e} /></NavLink>)}
        <div style={{clear:"both"}}></div>

    </div>
  );
}