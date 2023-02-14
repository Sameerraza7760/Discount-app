import React, { useEffect } from 'react'
import Imagecontainer from '../Imagecontainer'
import { useNavigate } from 'react-router-dom'
import adminItemsReducer from '../../Redux/adminReducer/adminItemsReducer'
import  useSelector  from 'react-redux'
import {
    swal,
    doc,
    setDoc,
    collection,
    getDocs,
    db,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
    auth,
  } from "./../../Config/firebase";
import { useState } from 'react'
import './../style.css'

function Home() {
    const navigate=useNavigate()

    const [adminitems,setADminItems]=useState([])
     
    useEffect(() => {
        const getItemsOfADmin = async()=> {
                const querySnapshot = await getDocs(collection(db, "adminItems"));
                const adminarray = [];
                querySnapshot.forEach((doc) => {
                  adminarray.push({ id: doc.id, ...doc.data() });
                });
                console.log( "array==>", adminarray)
                setADminItems(adminarray)
           
                }
                getItemsOfADmin()
              
     
      },[]);

      console.log("q==>",adminitems)




   

        const adminItemstoShow= adminitems.map((items)=>{
        console.log(items)

        return <div className='adminItemContainer'>
            <div className='adminItemsImage'>
              <img src={items.adminImage} alt=""/>
            </div>
            <div>  <h2  style={{color:'green',paddingLeft:'20px'}}   >{items.productName}</h2></div>

            <div  style={{paddingTop:'10%' ,fontSize:'22px' } }><p>{items.productDesc}</p></div>
        </div>
      })



  return (
   <>
    <div><Imagecontainer/>
    
    </div>
    <div >
  
        <h1>{adminItemstoShow}</h1>



    </div>
   
    </>
  )
}

export default Home