
import React, { useState,useEffect } from 'react';

import "../styles/Feedbacks.css";

import API from '../api/api';
import { useToasts } from 'react-toast-notifications';

export default function Feedbacks(props) {
  const { addToast } = useToasts();
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackValue, setFeedbackValue] = useState("");
  function handleChange(event){
    setFeedbackValue(event.target.value)
  }
  async function getFeedbacks(){
    setFeedbacks(await API.getFeedbacks(props.selectedPerf.id))
  }
  async function sendFeedback(){
    let res = await API.postFeedback(feedbackValue,props.selectedPerf.id);
    
    if(res){
      addToast("Posted Successfully", {
        appearance: 'success',
        autoDismiss: true,
        
      });

    }else{
      addToast("Something went wrong", {
        appearance: 'error',
        autoDismiss: true,
        
      })
    }
    getFeedbacks();
  }
  useEffect(() => {
    
  
    getFeedbacks();
  
  }, [props]);

  if(feedbacks.length==0){
    return <div>
       <h2><span>{props.selectedTag}'s Feedback</span></h2>
       <div className={"bigNo"}>No feedback</div>
       <div className={"feedbacks"}>
        <textarea onChange={handleChange} placeholder={"Enter your feedback here!"}></textarea>
        <button className={"box"} onClick={sendFeedback}>Send Feedback</button>
      </div>
    </div>
  }
  return (
    <div className={"feedbacks"}>
      <h2><span>{props.selectedTag}'s Feedback</span></h2>
      {feedbacks.map((f)=>{
        return <div key={f.id} className={"feed"}>
          <div className={"empCard"}>
              <img src={require("../imgs/User-male-icon-vector-01.svg")} />
              <div className={"name"}>{f.employee.name}</div>
          </div>
          <div className={"feedText"}>{f.feedback}</div>
        </div>
      })}
      <div>
        <textarea onChange={handleChange} placeholder={"Enter your feedback here!"}></textarea>
        <button className={"box"} onClick={sendFeedback}>Send Feedback</button>
      </div>
    </div>
  );
}
