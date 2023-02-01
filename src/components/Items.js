import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Pagination from './Pagination';
import "./Items.css";

const Items = () => {
    const [allData,setAllData]=useState([]);
    const [data,setData]=useState([]);
    const [get,setGet]=useState(true);
    const [show,setShow]=useState(false);
    const [pop,setPop]=useState({});

    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);
    
    const limit=10;
    const [pagination,setPagination]=useState({start:0,end:limit});

    useEffect(()=>{
        axios("https://fakestoreapi.com/products").then((data)=>{
            setData(data.data);
            setAllData(data.data);
        }).catch((err)=>console.log(err));
    },[get]);

    const onPaginationChange=(start,end)=>{
        setPagination({start,end});
    }

    const selectHandler=(e)=>{
        if(e.target.value==="all"){
            setGet(!get);
        }else{
            const newData=allData.filter((item)=>{
                if(item.category === e.target.value){
                    return item.category;
                }
            });
            setData(newData);
        }
    }

    const popupHandle=(item)=>{
        setPop(item);
        handleShow();
    }

    const popupClose=()=>{
        handleClose();
    }

  return (
    <div>
        <div className='title'>
            <h1>Available Products</h1>
        </div>
        <div className='select'>
            <select onChange={(e)=>selectHandler(e)} >
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="jewelery">Jewellery</option>
                <option value="women's clothing">Women's Clothing</option>
            </select>
        </div>
        <div className='mainBody'>
            {data.slice(pagination.start,pagination.end).map((item,idx)=>{
                return(
                    <div className='imgSec' key={idx} onClick={()=>popupHandle(item)}>
                        <img src={item.image} /> 
                    </div>
                )
            })}
        </div>
        <div className='pagination'>
            <Pagination limit={limit} total={data.length} onPaginationChange={onPaginationChange}/>
        </div>
        <Modal show={show} onHide={handleClose} animation={false} centered
            style={{marginLeft:"40%",marginTop:"10%",width:"500px",height:"400px",lineHeight:"25px",textAlign:"center"}}>
                <Modal.Body>
                    <div className='pop'>
                        <div className='heading'>
                            <span className='bold'>{pop.category}</span>
                            <button onClick={()=>popupClose()} >Close</button>
                        </div>
                        <div className='modalBody'>
                            <img src={pop.image} />
                            <span style={{textAlign:"left",marginLeft:"20px"}} ><span style={{fontWeight:"bold"}}>Description :</span>{pop.description}</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  )
}

export default Items;