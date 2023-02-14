
import Navbar from './Navbar'
import Footer from './Footer'
import React, { useEffect, useState } from "react";

import { useDispatch } from 'react-redux';

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

      import  adminItems  from '../Redux/adminaction/adminaction';

const Index = () => {

 const dispatch = useDispatch();

  const [adminItem, setAdminItems] = useState([]);




  const createItems = async () => {
    try {
      const productName = document.getElementById("productName").value;
      const productDesc = document.getElementById("productDesc").value;
      const unitName = document.getElementById("unitName").value;
      const unitPrice = document.getElementById("unitPrice").value;
      const adminImage = await uploadImage(
        document.getElementById("product-img").files[0]
      );

      let itemsAdmin = {
        productName,
        productDesc,
        unitName,
        unitPrice,
        adminImage
      };

      for (let i in itemsAdmin) {
        if (itemsAdmin[i].length === 0) {
          await swal("Please Fill All Inputs");
          return;
        }
      }

      await setDoc(
        doc(db, "adminItems", auth.currentUser.uid+Date.now()),
        itemsAdmin
      );

      await swal("Congratulations!", "Item Added", "success");

      const querySnapshot = await getDocs(collection(db, "adminItems"));
      const adminarray = [];
      querySnapshot.forEach((doc) => {
        adminarray.push({ id: doc.id, ...doc.data() });
      });
      dispatch(adminItems(adminarray));
      console.log(adminarray)
    } catch (e) {
      swal({
        icon: "error",
        title: "Oops...",
        text: e.message,
      });
    }
    
  }
  




  const uploadImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  return (
    <>
      <Navbar /> 
      <div className="container">
        <p className="fs-6 mt-5 ms-2" style={{ color: "#024F9D" }}>Add New Items</p>
        <div className="container">
          <div className="signup-form w-75 mx-auto mt-2">
            <div className="input-fields">
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Product Name" id="productName" />
              </div>
              <div className="input-group" style={{border: "1px solid grey"}}>
                <textarea className="form-control " type="text" placeholder="Product Description" id="productDesc" />
              </div>
              <div className="input-group">
                <select className="form-control mb-2 border-0" id="class-schedule">
                  <option className="hidden" >Select Category
                  </option>
                  <option value="fruit">Fruits</option>
                </select>
              </div>
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Unit Name" id="unitName" />
              </div>
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Unit Price" id="unitPrice" />
              </div>
              <div className="mb-3" style={{ border: "2px solid grey" }}>
                <input className="form-control" type="file" id="product-img" />
              </div>
            </div>
            <div className="signup-btn text-center mb-2">
              <button className='btn btn-primary theme-btn mt-1 fw-bold px-4 shadow' onClick={createItems} >Add Product</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>

  )
}

export default Index