import React from 'react'
import logo from './../../images/Logo.png'
import { useNavigate } from 'react-router-dom'
import ADMIN from '../../Redux/adminaction/adminaction'
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useEffect } from 'react'
import {
  collection,
  getDocs,
  db,
} from "../../Config/firebase/firebase"; 
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
      dispatch(ADMIN(adminarray))
    }
    getAdmin();
  }, []);
  return (
    <div>
    <div>
      <div className="container welcome-screen mt-5">
        <div className="img-sec text-center">
          <img src={logo} alt="" className="img-fluid" />
          <h1 className="green-text mt-5 " style={{ color: "#61b846" }}>
            SAYLANI WELFARE
          </h1>
          <p className="blue-text fw-bold mt-3">ONLINE DISCOUNT STORE</p>
          <Button
            style={{
              backgroundColor: "#61b846",
              color: "white",
              padding: "7px 25px 7px 25px",
            }}
            onClick={() => {
              navigate("/Signup");
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Getstart