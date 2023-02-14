import React from 'react'
import logo from './images/Logo.png'
import './style.css'
import { useNavigate } from 'react-router-dom'
import ADMIN from '../Redux/adminaction/adminaction'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import {
  collection,
  getDocs,
  db,
} from "./../Config/firebase"; 
const Getstart=()=> {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    async function getAdmin() {
      const querySnapshot = await getDocs(collection(db, "Admin"));
      const adminarray=[]
      querySnapshot.forEach((doc) => {
        adminarray.push({ id: doc.id, ...doc.data()})
      })
      // console.log(adminarray)
      dispatch(ADMIN(adminarray))
       







    }
    getAdmin();
  }, []);
  








  return (
    <div className='start-Container'>
      <div  className='imageStore'>
        <img src={logo} alt="" />

       </div>
      <div className='btn-Start'>
        <button  onClick={()=>navigate('/Signup')} >
            Get Started
        </button>
      </div>
    </div>
  )
}

export default Getstart