
import Loadable from 'react-loadable';
import React,{useState,useEffect,Component} from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

// is Loading page
import Loading from '../interfaces/Loading';

const AdminLoad = Loadable({
  loader: () => import('../interfaces/Admin'),
  loading: Loading,
});
const EmployeeLoad = Loadable({
  loader: () => import('../interfaces/Employee'),
  loading: Loading,
});
const EmployeesViewLoad = Loadable({
  loader: () => import('../interfaces/EmployeesView'),
  loading: Loading,
});


export default function EmployeesView(propsO) {

   
  return (
    <Switch>
      
      <Route path="/admin" component={(props) => <AdminLoad {...propsO} isAuthed={true} />} />
      <Route path="/employeeView/:emp_id" component={(props) => <EmployeeLoad {...propsO} pathProps={props} isAuthed={true} />}  />
      <Route path="/employeeView" component={(props) => <EmployeeLoad {...propsO} isAuthed={true} />}  />
      <Route path="/employeesList" component={(props) => <EmployeesViewLoad {...propsO} isAuthed={true} />} />
      <Route exact path="/" component={(props) => <EmployeesViewLoad {...propsO} isAuthed={true} />} />
    </Switch>
  );

}