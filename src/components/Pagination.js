import React, { useEffect, useState } from 'react';
import "./Pagination.css";

const Pagination = ({limit,total,onPaginationChange}) => {
    const [count,setCount]=useState(1);
    const numOfBtn=Math.ceil(total/limit);

    useEffect(()=>{
        const num=limit * count;
        onPaginationChange(num-limit,num);
    },[count]);

    const pageNo=[];
    let i=1;
    while(i<=numOfBtn){
        pageNo.push(i);
        i++;
    }

    const onBtnClick=(type)=>{
        if(type==="prev"){
            if(count===1){
                setCount(1);
            }else{
                setCount(count-1);
            }
        }else if(type==="next"){
            if(numOfBtn===count){
                setCount(count);
            }else{
                setCount(count+1);
            }
        }
    }

  return (
    <div className='pageBody'>
        <div onClick={()=>onBtnClick("prev")} > <svg width="9" height="14" viewBox='0 0 9 14' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d='M6.65349 13.3066L8.21704 11.7431L3.13828 6.65324L8.21704 1.56339L6.65349 -0.000160066L9.11406e-05 6.65324L6.65349 13.3066Z' fill='#4D4D4D' />
        </svg>
        </div>
        {
            pageNo.map((page,idx)=>{
                return(
                    <span key={idx} className={count===idx+1?"blue":"grey"}>{page}</span>
                )
            })
        }
        <div onClick={()=>onBtnClick("next")} ><svg width="9" height="14" viewBox='0 0 9 14' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d='M1.56379 0L0.000244141 1.56355L5.07901 6.6534L0.000244141 11.7433L1.56379 13.3068L8.21719 6.6534L1.56379 0Z' fill='#4D4D4D' />
        </svg>
        </div>
    </div>
  )
}

export default Pagination;