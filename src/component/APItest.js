import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css'
export default function APItest() {
    const [width,setWidth]= useState(true)
    const [isActive, setIsActive] = useState(window.innerWidth)
  const [data, setData] = useState([]);
  const url = "https://66a07af87053166bcabb8822.mockapi.io/student";
  const fletchAPI = () => {
    axios
      .get(url)
      .then(function (res) {
        console.log(res);
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(()=>{
    if(width<700){
        setIsActive(true)
    }else{
        setIsActive(false)
    }
  }, [])
  useEffect(() => {
    fletchAPI();
  }, []);
  useEffect(()=>{
    const handleResize=()=>{
        setWidth(window.innerWidth)
        console.log(window.innerWidth);
        if(window.innerWidth<700){
            setIsActive(true)
        }else{
            setIsActive(false)
        }
    }
    window.addEventListener('resize',handleResize)
    return()=>{
        window.removeEventListener("resize",handleResize)
    }
  },[])
  return (
    <div className="container text-center">
      <h1>API Test</h1>
      <p>{width}</p>
      <div className={isActive?'active sidebar':'sidebar'}></div>
      <table className="m-4 w-30 mx-auto">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
