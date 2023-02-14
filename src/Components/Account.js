import React from 'react'

import Footer from './Footer'
import {swal,auth, } from './../Config/firebase'
import { useNavigate } from 'react-router-dom'


function Account() {
    const navigate=useNavigate()

    async function ubdateProfile(){
        await swal("profile ubdated sussesfully")
    }
    async function logout() {
  
        await auth.signOut();
   
        await swal({
           title: 'Congrats! Logged Out Successfully.',
         
         
       })
       navigate('/')}
     
  return (
    <div> 
        <h1 style={{color:'green',fontFamily:'sans-serif'}} >Setting</h1>  
        <button className='btn btn-primary theme-btn mt-1 fw-bold px-4 shadow' onClick={logout} >Logout</button>
    <div className="container">
         <div className="container">
        <div className="signup-form w-75 mx-auto mt-2">
          <div className="input-fields">
            <div className="input-group">
              <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="UserName" id="Username" />
           
            </div>
            <div className="mb-3" style={{ border: "2px solid grey" }}>
              <input className="form-control" type="file" id="product-img" />
            </div>
          </div>
          <div className="signup-btn text-center mb-2">
            <button className='btn btn-primary theme-btn mt-1 fw-bold px-4 shadow'  onClick={ubdateProfile} >Ubdated Profile</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/></div>
  )
}

export default Account