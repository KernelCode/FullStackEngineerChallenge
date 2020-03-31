import React, { useState,useEffect } from 'react';

import "../styles/Employee.css";
import {FaInfoCircle } from 'react-icons/fa';

export default function Employee(props) {
  
  useEffect(() => {

    return ()=>{}
  }, []);
  if(!props.e){
    return<div></div>;
  }
  let typeDOM = null;
  if(props.e.level==0){
    typeDOM = <span className={"level admin"}>ADMIN</span>
  }else{
    typeDOM = <span className={"level empl"}>Employe</span>
  }
  return (
    <div className={"emp-card"}>
      <div >
        <img src={require("../imgs/User-male-icon-vector-01.svg")} />
        {typeDOM}
        <div className={"name"}>{props.e.name}</div>
        <div className={"email"}>{props.e.email}</div>
      </div>
    </div>
  );
}