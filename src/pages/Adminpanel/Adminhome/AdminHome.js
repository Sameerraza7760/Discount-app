import React, { useEffect, useState } from 'react';
import Footer from '../../../Components/Footer/Adminfooter/Footer';
import Navbar from '../../../Components/Navbar/Navbar';
import { collection, db, getDocs } from '../../../Config/firebase/firebase';

function AdminHome() {
  const [adminitems, setAdminItems] = useState([]);

  useEffect(() => {
    const getItemsOfAdmin = async () => {
      const querySnapshot = await getDocs(collection(db, 'adminItems'));
      setAdminItems(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getItemsOfAdmin();
  }, []);

  return (
    <>
      <Navbar />
      <div className='w-full mx-auto' >
        <div className="order-img"></div>
        <h6 className="mt-5 mb-5 blue-text fw-bold">All Products</h6>
        {adminitems.map((item, index) => (
          <div className="hp-card d-flex justify-content-between align-items-center mb-3 w-[90%] mx-auto " key={index} style={{ height: '100%' }}>
            <div className="p-img">
              <img src={item.adminImage} className="img-fluid" width="140px" alt="" />
            </div>
            <div className="p-info">
              <p className="green-text fw-bold">{item.productName}</p>
              <p className="text-secondary fw-bold">Unit: {item.unitName}</p>
            </div>
            <div className="p-price">
              <p className="text-secondary fw-bold">Price:   {item.unitPrice}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default AdminHome;
