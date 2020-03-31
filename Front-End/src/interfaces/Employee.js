import React, { useState,useEffect } from 'react';

import "../styles/EmployeeInterface.css";

import API from '../api/api';
import { FaStar,FaInfoCircle } from 'react-icons/fa';
import Feedbacks from '../components/Feedbacks'
export default function Employee(props) {
  const [user, setUser] = useState(null);
  const [selectedTag, setTag] = useState(null);
  const [selectedPerf, setPerf] = useState(null);
  
  useEffect(() => {
    
    async function getUser(){
      if(props.pathProps && props.pathProps.match.params.emp_id){
        setUser(await API.getEmp(props.pathProps.match.params.emp_id))
      }else{
        setUser(await API.getEmp(props.user.id))
      }
    }
    getUser();
    return ()=>{}
  }, []);
  if(!user){
    return <div></div>;
  }
  let typeDOM = null;
  if(user.level==0){
    typeDOM = <span className={"level admin"}>ADMIN</span>
  }else{
    typeDOM = <span className={"level empl"}>Employe</span>
  }
  return (
    <div className={"profile"}>
    <div className={"msg info"} style={{marginBottom:20,width:"96%"}}><FaInfoCircle/>Click On Tags to show Other Employees Feedback</div>
        <img src={require("../imgs/User-male-icon-vector-01.svg")} />
        {typeDOM}
        <div className={"name"}>{user.name}</div>
        <div className={"tags "}>
          {(()=>{
            if(user.performance_reviews.length===0){
              return <div>You Have No Performance Tags</div>
            }
          })()}
          {user.performance_reviews.map((y,index)=><div onClick={()=>{
            setTag(y.review.title)
            setPerf(y)
          }} className={"tag "} key={index+"tag"}>
            <span>{y.review.title}</span>
            <div className={"score"}><div className={"scoreText"}>{y.score}</div><FaStar /></div>
          </div>)}
        </div>
   
        {selectedTag && <Feedbacks selectedTag={selectedTag} selectedPerf={selectedPerf} user={user} />}
        
        <div style={{clear:"both"}}></div>
    </div>
  );
}