import React, { useState,useEffect } from 'react';


import Modal from 'react-modal';
import { useForm,Controller  } from "react-hook-form";
import Select from "react-select";
import {useHistory} from "react-router-dom";
import API from '../api/api';
import { useToasts } from 'react-toast-notifications';

// import styles
import '../styles/EmployeeEditModal.css'
import { FaEnvelope,FaUserCircle,FaLock,FaInfoCircle,FaStar } from 'react-icons/fa';
const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999"
  })
};

// link to root
Modal.setAppElement('#root')

export default function EmployeeEditModal(props) {

  const { control,handleSubmit, register, errors } = useForm();
  const [showErrorMessage,setErrorMessage] = useState(false);
  const [stillLoading,setStillLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();

  // select options
  const options = [
    { value: '0', label: 'Admin' },
    { value: '3', label: 'Employee' }
  ]
  let val =options[0];
  if(props.user){
    
    val = options.filter(obj => {
      return obj.value === props.user.level
    })
    val = val[0];
  }

  const [value, setSelectedValue] = useState(val);

  const [multiValue, setMultiValue] = useState([]);
  

  const filterOptions = props.tags.map(v=>({ value: v.id, label: v.title }));


  useEffect(() => {
    if(props.user && props.user.performance_reviews)
      setMultiValue(props.user.performance_reviews.map(v=>({value: v.reviewId, label: v.review.title})));
  },[props]);

  const handleChange = val => {
  
    setSelectedValue(val[0]);
  }

  // modal
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function handleMultiChange(option) {
  
    setMultiValue(option);
  }
  function afterOpenModal() {
    
  }

  function getAddedRemoved(prev,news){

    var removed = [];
    prev.forEach((item)=>{
      var i = news.indexOf(item);
      if(i>-1){
        news.splice(i,1);
      }else{
        removed.push(item);
      }
    })
  
    return {added:news,removed:removed};
  }
  const onSubmit = async values => {
    setStillLoading(true)
    values.id = props.user.id;
    values.level = value.value;
    if(!props.isAdd){
      values.pref_performance_reviews = props.user.performance_reviews.map(v=>(v.reviewId));
      
    }else{
      values.pref_performance_reviews = [];
    }
    var addedRemoved =null;

    if(multiValue){
      values.new_performance_reviews = multiValue.map(v=>(v.value));
      addedRemoved = getAddedRemoved(values.pref_performance_reviews,values.new_performance_reviews)
    }

    if(addedRemoved){
      addedRemoved.added.forEach(async (item)=>{
        // add
        await API.addTag(item,props.user.id);
      });
      addedRemoved.removed.forEach(async (item)=>{
        // delete
        await API.removeTag(item,props.user.id);
      });
    }else{
      values.pref_performance_reviews.forEach(async (item)=>{
        // delete
        await API.removeTag(item,props.user.id);
      })
    }
    let res =[];
    if(props.isAdd){
      res = await API.add("employees",values);
    }else{
      res = await API.saveEmp(values);
    }
    
    if(res.length<=0){
      addToast("Something went wrong", {
        appearance: 'error',
        autoDismiss: true,
        
      })
    }else{
      addToast("Saved Successfully .", {
        appearance: 'success',
        autoDismiss: true,
      });
     
    }
    props.table.fireFetchData();
    props.closeModal();
    setStillLoading(false)
  };


  if(!props.user)
    return<div></div>;

  return <div >
    <Modal
      isOpen={props.modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={props.closeModal}
      className={"Modal-admin"}
    >
    <form onSubmit={handleSubmit(onSubmit)} className={"login-form"}>
      <div className={"header"}>
        {props.isAdd ? <div>Adding New Employee</div> : <div>Editing <span style={{fontWeight:"bold"}}>{props.user.name}</span></div>}
      </div>
      <div className={"body"}>
          <img src={require("../imgs/User-male-icon-vector-01.svg")} />
          <div className={"input"}>
            <FaUserCircle/>
            <input
              placeholder={"Abdullah Altahery"}
              name="name"
              defaultValue={props.user.name}
             
              ref={register({
                required: 'Required'
              })}
            />
            {errors.name &&<div className={"warnning-message"}><FaInfoCircle/>{errors.name.message}</div>}
          </div>
          <div className={"input"}>
            <FaEnvelope/>
            <input
              placeholder={"example@example.com"}
              name="email"
            
              defaultValue={props.user.email}
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: <div className={"warnning-message"}>invalid email address</div>
                }
              })}
            />
            {errors.email &&<div className={"warnning-message"}><FaInfoCircle/>{errors.email.message}</div>}
          </div>

          <div className={"input"}>
            <FaLock/>
            <input
              name="password"
              type="password"
              placeholder={"leave empty if no changes"}
              ref={register({
                //required: 'Required',
              })}
            />
            {errors.password &&<div className={"warnning-message"}><FaInfoCircle/>{errors.password.message}</div>}
          </div>
          <div className={"input"}>
            <FaUserCircle/>
            <Controller
              as={Select}
              name="level"
              control={control}
              onChange={handleChange}
              defaultValue={value}
              styles={selectStyles}
              options={options}
            />
        
            
          </div>
          <div className={"multi"}>
            <Select
              name="filters"
              placeholder="Filters"
              value={multiValue}
              options={filterOptions}
              onChange={handleMultiChange}
              isMulti
            />
          </div>
        
          {showErrorMessage &&<div className={"error-message"}><FaInfoCircle/>incorrect email or password!</div>}
          
        </div>
        <div className={"footer"}>
          {props.isAdd ? 
            stillLoading ? 
              <img style={{height:80,width:"100%"}} src={require("../imgs/Rolling-1s-200px.svg")} />
              :
              <button type="submit">Add</button> 
            : 
            stillLoading ? 
              <img style={{height:80,width:"100%"}} src={require("../imgs/Rolling-1s-200px.svg")} /> 
              :
              <button type="submit">Save</button> 
          }
        
        </div>
      </form>
    </Modal>
  </div>
}