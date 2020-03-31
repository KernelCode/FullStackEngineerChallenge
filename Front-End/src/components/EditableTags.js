import React, { useState,useEffect } from 'react';

import "../styles/EditableTags.css";
import {FaTimes } from 'react-icons/fa';
import { useToasts } from 'react-toast-notifications';
import API from '../api/api';
export default function EditableTags(props) {
  useEffect(() => {
    
    return ()=>{}
  }, []);
  const { addToast } = useToasts();
  
  async function onKeyUp(event){
    if (event.keyCode === 13) {
      let res = null;
      if(props.tag.id==-1){
        res = await API.add("reviews",{
          title:event.target.value
        });
      }else{
        res = await API.saveReview({
          title:event.target.value,
          id:props.tag.id
        });
      }
      
      if(res.length<=0){
        addToast("Something went wrong", {
          appearance: 'error',
          autoDismiss: true,
          
        })
      }else{
        addToast("Updated Successfully .", {
          appearance: 'success',
          autoDismiss: true,
        });
       
      }
   
    }
  }
  async function deleteTag(id){
    
    addToast("Wait a moment!", {
      appearance: 'info',
      autoDismiss: true,
    })
    var res = null;
    if(props.tag.id==-1){
      res = 1;
    }else{
      res = await API.del("reviews",id);
    }
    
    
    setTimeout(()=>{
      if(res===1){
        addToast("Deleted Successfully", {
          appearance: 'success',
          autoDismiss: true,
          
        })
      }else{
        addToast("Something went wrong", {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      props.getTags();
    },1000);
  }
  if(!props.tag)
    return<div></div>;
  return (
    <div className={"tag-card"}>
      <div className={"tag"} >
        <input defaultValue={props.tag.title} onKeyUp={(event)=>onKeyUp(event,this)}></input>
        <FaTimes onClick={()=>deleteTag(props.tag.id)} />
      </div>
    </div>
  );
}