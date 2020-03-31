import React, { useState,  } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import "../styles/Login.css";
import { FaEnvelope,FaUserCircle,FaLock,FaInfoCircle } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import API from '../api/api';
import {useHistory} from "react-router-dom";

export default  function Login(props) {

  const { handleSubmit, register, errors } = useForm();
  const [showErrorMessage,setErrorMessage] = useState(false);
  const [stillLoading,setStillLoading] = useState(false);

  const history = useHistory();

  const onSubmit = async values => {
    setStillLoading(true)
    var res = await API.login(values);
   
    if(res.msg!=="ok"){
      setErrorMessage(true);
      
    }else{
      props.setUser(res.data);
      history.push("/employeesList");
      return;
    }
    setStillLoading(false)
  };


  return (
    <Grid >
   <img className={"login-bg"} src={require("../imgs/login-bg.png")} />
      <Row>
        <Col xs={12}>
          <Row center="md">
            <Col xs={12} md={6} >
              <div className="login-card">
                <div className="login-icon"><FaUserCircle /></div>
                <div className="title">Sign In</div>
                <form onSubmit={handleSubmit(onSubmit)} className={"login-form"}>
                  <div className={"input"}>
                    <FaEnvelope/>
                    <input
                      placeholder={"example@example.com"}
                      name="email"
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
                      placeholder={"password"}
                      ref={register({
                        required: 'Required',
                      })}
                    />
                    {errors.password &&<div className={"warnning-message"}><FaInfoCircle/>{errors.password.message}</div>}
                  </div>
                  {showErrorMessage &&<div className={"error-message"}><FaInfoCircle/>incorrect email or password!</div>}
                 
                  {stillLoading ? <img style={{height:80,width:"100%"}} src={require("../imgs/Rolling-1s-200px.svg")} /> :<button type="submit">Login</button> }
                  <div className={"footer"}>Forget <span style={{fontWeight:"bold"}}><span className={"resetHover"}>Username</span>/<span className={"resetHover"}>Password</span></span> ?</div>
                </form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
   

    </Grid>
  );
}