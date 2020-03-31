import React, { useState } from 'react';

import "../styles/Loading.css";


export default function Loading() {

  return (
    <div className={"loading"}>
      <img style={{width:"100%"}} src={require("../imgs/Ball-3.1s-197px.svg")} />
    </div>
  );
}