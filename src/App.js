import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Students from './APIstudent/Students';

export default function App() {
    const [show, setShow]= useState(true)
  return (
    <div>
        {/* {
    show?<APItest/>:"aloalaoal"
}
    <button onClick={()=>setShow(!show)}>show</button> */}
    <Students/>
    </div>
  )
}