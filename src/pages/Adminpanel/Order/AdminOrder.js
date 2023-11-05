
import React, { useState, useEffect } from 'react';
import { auth, doc, updateDoc, getDocs, collection, db,setDoc,swal } from '../../../Config/firebase/firebase';
import Button from '@material-ui/core/Button';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Adminfooter/Footer';


function AdminOrder() {
  const [order, setOrder] = useState([]);
  
const convertMillisecondsToTime = (ms) =>
new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const changeStatus = async (item, status) => {
    const orderDocRef = doc(db, 'orderItem', item.id);
    await updateDoc(orderDocRef, { status });
    await setDoc(doc(db, 'OrderResponce', auth.currentUser.uid), item);
    swal(`Order ${status}`);
  };

  useEffect(() => {
    const getOrder = async () => {
      const querySnapshot = await getDocs(collection(db, 'orderItem'));
      setOrder(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    getOrder();
  }, [changeStatus]);

  return (
    <div>
      <Navbar />
      <h6 className="my-4 blue-text fw-bold">Orders</h6>

      <div className="order-page" style={{ height: 'auto' }}>
        {order.map((item) => (
          <div className="order-sec container mb-5" key={item.id}>
            <div className="orders d-flex justify-content-between">
              <div className="user-bio">
                <p className="m-0 fw-bold">{item.fullName}</p>
                <small>
                  {convertMillisecondsToTime(item.time)} - {item.status}
                </small>
                <div className="p-items mt-3">
                  {item.cartItem.map((e, innerIndex) => (
                    <small key={innerIndex}>1 x {e.productName} <br /></small>
                  ))}
                </div>
                <p>Total</p>
              </div>
              <div className="userdata" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p className="number fw-bold">{item.contact}</p>
                <p className="price green-text fw-bold">{item.orderPrice}</p>
              </div>
            </div>
            <div className="input-group">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '20px' }}
                  className={item.status === 'pending' ? 'btn btn-success mx-2' : 'd-none'}
                  onClick={() => changeStatus(item, 'accepted')}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '20px' }}
                  className={item.status === 'accepted' ? 'btn btn-success mx-2' : 'd-none'}
                  onClick={() => changeStatus(item, 'delivered')}
                >
                  Delivered
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: '20px' }}
                  className={item.status === 'pending' ? 'btn btn-success mx-2' : 'd-none'}
                  onClick={() => changeStatus(item, 'rejected')}
                >
                  Reject
                </Button>
              </div>
            </div>
            <hr className="w-75 mt-4 container" />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AdminOrder;
