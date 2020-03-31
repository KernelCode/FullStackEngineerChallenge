import React, { useState,useEffect } from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import '../styles/Admin.css'
import { IoMdAdd} from 'react-icons/io';
import { FaUserEdit,FaEye,FaTrash,FaInfoCircle,FaStar} from 'react-icons/fa';
import API from '../api/api';
import { useToasts } from 'react-toast-notifications';
import Moment from 'react-moment';
import 'moment-timezone';
import EmployeeEditModal from '../components/EmployeeEditModal'
import EditableTags from '../components/EditableTags'
import {useHistory} from "react-router-dom";
export default function Admin(props) {
  const history = useHistory();
  const [emps, setEmps] = useState([]);
  const [pages, setPages] = useState(-1);

  const [loading, setLoading] = useState(false);
  const [currentModalUser, setCurrentModalUser] = useState(null);

  const { addToast } = useToasts();
  const [refReactTable, setRefReactTable] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [tags, setTags] = useState([]);
  
  // modal
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
  
    setIsOpen(true);
  }
 
  async function getTags() {
     
    setTags(await API.getAll("reviews"));
  
  };
  useEffect(() => {
  
    
    getTags();
  }, []);

  function closeModal(){
    setIsOpen(false);
  }
  async function addNewTag(){

    setTags([
      
      ...tags,
      {id:-1,title:"Insert New Tag"}
    ])
  }
  async function deleteEmp(id){

    var res = await API.del("employees",id);
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
  }
  const columns = [{
    Header: 'Id',
    accessor: 'id',
    width: 60
  },{
    Header: 'Name',
    accessor: 'name',
    width: 200,
    Cell: props => <span style={{fontWeight:"bold"}}>{props.value}</span> 
  }, {
    Header: 'Email',
    accessor: 'email',
    width: 200,
    
  },{
    Header: props => <span>Level</span>, 
    accessor: 'level',
    width: 100,
    Cell: props => {
      
      if(props.value==0){
        return <span className={"level admin"}>ADMIN</span>
      }else{
        return <span className={"level empl"}>Employe</span>
      }
    } 
  }, {
    Header: props => <span>Performans Reviews</span>, 
    accessor: 'performans_reviews',
    Cell: props => {
      if(props.original.performance_reviews.length>0){
        return props.original.performance_reviews.map((val,index)=><div key={index+"tag"}><span className={"qualityTag"}>{val.review.title} {val.score} <FaStar /></span></div>)
      }
      
    }
  }, {
    Header: props => <span>Created Date</span>, 
    accessor: 'createdAt',
    width: 100,
  Cell: props => {
   
    return <span ><Moment date={props.original.createdAt} fromNow /></span>
  } 
    }, {
    Header:"Actions",
    Actions: props => <span>Actions</span>,
    width: 120,
    Cell: props => <div>
      <FaUserEdit className={"action"} onClick={()=>{openModal();setIsAdd(false);setCurrentModalUser(props.original)}}/>
      <FaEye className={"action"} onClick={()=>{history.push(`employeeView/${props.original.id}`);}}/>
      <FaTrash className={"action"} onClick={()=>{deleteEmp(props.original.id);setTimeout(()=>refReactTable.fireFetchData(),1000)}}/>
    </div> 
  }]
  if(props.user && props.user.level>0){
    
    return <div style={{height:"100vh"}}><div className={"msg warn"}><FaInfoCircle/>Sorry Only Admin Can See This Page!</div></div>
  }
  return <div >

    <div className={"addEmpButton"} onClick={()=>{openModal();setIsAdd(true);setCurrentModalUser({name:""})}}>
      <IoMdAdd  />
    </div>
    <h2 style={{marginTop:0}}><span>Employees</span></h2>
    <div style={{clear:"both"}}></div>
 
    <div className={"table"}>
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        ref={(refReactTableL) => {setRefReactTable(refReactTableL)}}
        data={emps} 
        pages={pages} 
        loading={loading}
        manual 
        onFetchData={(state, instance) => {
          setLoading(true);
     
          API.getLimitTable("employees",{
            page: state.page,
            pageSize:state.pageSize,
            // currentlly not supported!
            //sorted: state.sorted,
            //filtered: state.filtered
          }).then((res)=>{
            setPages(Math.round(res.count/state.pageSize)+1);
            setEmps(res.rows);
            setLoading(false);
          }).catch(err=>{
            addToast("Something went wrong", {
              appearance: 'error',
              autoDismiss: true,
              
            })
            setLoading(false);
          })
          
           
        }}
      />
    </div>
  
    <h2 style={{marginTop:0,marginBottom:10}}><span>Reviews Tages</span></h2>
    <div className={"msg info"} style={{marginBottom:20,width:"96%"}}><FaInfoCircle/>Click On Tags to change them and Press Enter to update!</div>
    <div style={{clear:"both"}}></div>

    <div className="tags">
      
      {tags.map((tag, index) => (
        <EditableTags key={index+"tag"} tag={tag} getTags={getTags} />
      ))}
      <div className={"newTag"} onClick={addNewTag}><IoMdAdd  /></div>
      <div style={{clear:"both"}}></div>
    </div>
    <EmployeeEditModal modalIsOpen={modalIsOpen} tags={tags} isAdd={isAdd}  table={refReactTable} closeModal={closeModal} user={currentModalUser} />
  </div>
}