import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import {onAuthStateChanged,getAuth} from './../Config/firebase'
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
  } from "./../Config/firebase";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';







function AdminHome() {

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

        return <div className="horizontal-card-sec container">
                
                <div className="hp-card d-flex justify-content-between align-items-center mb-3">
                    <div className="p-img">
                        <img  className="img-fluid" alt="" />
                    </div>
                    <div className="p-info">
                        <p className='green-text fw-bold'>{items.productName}</p>
                        <p className='text-secondary fw-bold'>{items.unitName}</p>
                    </div>
                    <div className="p-price">
                        <p className="text-secondary fw-bold">{items.unitPrice}</p>
                    </div>
                </div>
                 <div className="hp-card d-flex justify-content-between align-items-center mb-3">
                    <div className="p-img" style={{width:'300px',height:'20vh'}} >
                        <img  className="img-fluid"  src={items.adminImage} alt=""  style={{height:'100%',width:'100%'}} />
                    </div> 
                   
</div>






</div>










      })





  return (
    <>
    <div>
         <Navbar/>
            <div>
            <h6 className='mt-5 mb-5 blue-text fw-bold'>All Products</h6>
            {adminItemstoShow}
            </div>
            <Footer/>
    </div>
       </>
  )
}

export default AdminHome