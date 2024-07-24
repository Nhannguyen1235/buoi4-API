import React, { useEffect, useState } from 'react'

export default function Hook1() {
    const [count, setCount] = useState(0)
    const [number,setNumber] = useState(1)
    // useEffect(()=>{
    //     console.log('useEffect render');
    // },[count])
    // useEffect(()=>{
    //     console.log('useEffect 2 render');
    //     return () => {
    //     }
    // },[number])
    useEffect(()=>{
        const interval = setInterval(()=>{
            console.log('useEffect 3 render');
            setCount(preState => preState +1)
        },17)
        //ngay ko component được ẩn đi thì tác vụ của useEffect này dừng lại không chạy nữa để tránh trường hợp lặp tràn bộ nhớ
        return () => {
            clearInterval(interval);
            console.log('interval clean up');
        }
    },[])
  return (
    <div>
        <p>{count}</p>
        <button onClick={()=>setCount(count+1)}>+</button>
        <p>{number}</p>
        <button onClick={()=>setNumber(number+1)}>+</button>
    </div>
  )
}
