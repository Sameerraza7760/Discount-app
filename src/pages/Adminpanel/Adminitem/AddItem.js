
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { swal, doc, setDoc, collection, getDocs, db, storage, ref, uploadBytes, getDownloadURL, auth } from '../../../Config/firebase/firebase';
import adminItems from '../../../Redux/adminaction/adminaction';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Adminfooter/Footer';
import { CircularProgress } from '@mui/material';
const Index = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const createItems = async () => {
    try {
      const productName = document.getElementById('productName').value;
      const productDesc = document.getElementById('productDesc').value;
      const unitName = document.getElementById('unitName').value;
      const unitPrice = document.getElementById('unitPrice').value;
      const imageFile = document.getElementById('product-img').files[0];
      const productCategory = document.getElementById('productCategory').value;

      if (!productName || !productDesc || !unitName || !unitPrice || !imageFile || !productCategory) {
        swal('Please Fill All Inputs');
        return;
      }
      if (isNaN(unitPrice) || unitPrice <= 0) {
        swal('Unit Price must be a positive number');
        return;
      }
      setLoading(true);

      const adminImage = await uploadImage(imageFile);
      if (!adminImage) {
        swal('Image upload failed');
        setLoading(false);
        return;
      }
      const itemsAdmin = { productName, productDesc, unitName, unitPrice, adminImage, productCategory };


      // if (Object.values(itemsAdmin).map((value) => value.length === 0)) {
      //   swal('Please Fill All Inputs');
      //   return;
      // }

      await setDoc(doc(db, 'adminItems', `${auth.currentUser.uid}${Date.now()}`), itemsAdmin);
      swal('Congratulations!', 'Item Added', 'success');

      const querySnapshot = await getDocs(collection(db, 'adminItems'));
      const adminarray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(adminItems(adminarray));
    } catch (e) {
      swal({ icon: 'error', title: 'Oops...', text: e.message });
    }
    finally {
      setLoading(false);
      // document.getElementById('productName').value = '';
      // document.getElementById('productDesc').value = '';
      // document.getElementById('unitName').value = '';
      // document.getElementById('unitPrice').value = '';
      // document.getElementById('product-img').value = '';
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const myCategories = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(myCategories)
      setCategories(myCategories);
    };
    getCategories();
  }, []);

  const uploadImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    return getDownloadURL(snapshot.ref);
  };

  return (
    <>
      <Navbar />
      <div className="container h-auto mt-5" style={{ paddingBottom: '10%', height: 'auto' }}>
        <p className="fs-6 mt-5 ms-2" style={{ color: '#024F9D' }}>Add New Items</p>
        <div className="container">
          <div className="signup-form w-75 mx-auto mt-2">
            <div className="input-fields">
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Product Name" id="productName" />
              </div>
              <div className="input-group" style={{ border: '1px solid grey' }}>
                <textarea className="form-control" type="text" placeholder="Product Description" id="productDesc" />
              </div>
              <div className="input-group">
                <select id="productCategory" className="form-control mb-2 border-0">
                  {categories.map((item, index) => (
                    <option key={index} value={item.categoryName}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Unit Name" id="unitName" />
              </div>
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Unit Price" id="unitPrice" />
              </div>
              <div className="mb-3" style={{ border: '2px solid grey' }}>
                <input className="form-control" type="file" id="product-img" />
              </div>
            </div>
            <div className="signup-btn text-center mb-2">
              <button className="btn btn-primary theme-btn mt-1 fw-bold px-4 shadow" onClick={createItems}>
                {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
