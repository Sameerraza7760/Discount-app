import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UserFooter from '../../../Components/Footer/Userfooter/UserFooter';
import { auth, db, doc, setDoc, swal } from '../../../Config/firebase/firebase';
import { clearCart, resetCartReducer } from '../../../Redux/cartaction/cartaction';
import { CircularProgress } from '@mui/material';
function UserCart() {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const cartItem = useSelector((state) => state.cartItemReducer.cartItemsArray);
  const dispatch = useDispatch();
  const avatar = 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp';
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItem.reduce((acc, curr) => acc + +curr.unitPrice, 0);
    setTotal(newTotal);
    setItem(cartItem);
  }, [cartItem]);

  const emptyCart = () => {
    toast.success('Cart cleared!', { position: toast.POSITION.BOTTOM_RIGHT });
    dispatch(clearCart());
    dispatch(resetCartReducer());
    setTotal(0);
  };

  const placeOrder = async () => {
    try {
      const name = document.getElementById('fullName').value;
      const contact = document.getElementById('contact').value;
      const email = document.getElementById('email').value;
      const shippingAddress = document.getElementById('shippingAdress').value;
      const cartItem = item;
      if (cartItem.length === 0) {
        swal('Your cart is empty!');
        return; 
      
      }
      const time = Date.now();
      const status = 'pending';
      const orderPrice = total;

      const orderItem = {
        name,
        contact,
        email,
        shippingAddress,
        cartItem,
        time,
        status,
        orderPrice,
      };

      if (Object.values(orderItem).some((field) => field.length === 0)) {
        swal('Please fill in all inputs.');
        return;
      }

      if (contact.length < 11) {
        swal('Phone number is less than 11 characters.');
        return;
      }
      if (contact.length > 11) {
        swal('Phone number is more than 11 characters.');
        return;
      }
      setLoading(true);

      await setDoc(doc(db, 'orderItem', `${auth.currentUser.uid}${Date.now()}`), orderItem);
      dispatch(clearCart());
      dispatch(resetCartReducer());
      setTotal(0);
      document.getElementById('fullName').value = '';
      document.getElementById('contact').value = '';
      document.getElementById('email').value = '';
      document.getElementById('shippingAdress').value = '';

      swal({
        title: 'Your Order is Placed',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-3 cart-page" style={{ height: '80%' }}>
        <div className="d-flex justify-content-end">
          <img src={avatar} alt="" width={50} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="info">
            <h5 className="blue-text m-0">Shopping</h5>
            <p className="fw-bold green-text">Cart</p>
          </div>
          <div className="del-icon" onClick={emptyCart}>
            <DeleteIcon className="green-text c-pointer" />
          </div>
        </div>

        <div className="cart-product" style={{ height: 'auto' }}>
          {cartItem.map((cart, index) => (
            <div className="hp-card d-flex border-0 justify-content-between align-items-center mb-4" key={index}>
              <div className="p-img">
                <img src={cart.adminImage} className="img-fluid" alt="" width={100} />
              </div>
              <div className="p-info">
                <p className="green-text fw-bold">{cart.productName}</p>
                <p className="text-secondary fw-bold">{cart.unitName}</p>
              </div>
              <div className="p-price">
                <p className="text-secondary fw-bold">{cart.unitPrice}</p>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-5 px-5">
            <p className="fw-bold">Total</p>
            <p className="fw-bold green-text">{total}</p>
          </div>
          <div className="cart-form px-5 mx-auto mt-5" style={{ margin: 'auto', width: '100%' }}>
            <div className="input-fields">
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Full Name" id="fullName" />
              </div>
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="number" placeholder="Contact" id="contact" />
              </div>
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="email" placeholder="Email" id="email" />
              </div>
              <div className="input-group">
                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Shipping Address" id="shippingAdress" />
              </div>
            </div>
            <div className="signup-btn text-center mb-5" style={{ margin: 'auto', width: '100%' }}>
              <button className="loginBtn mt-1 fw-bold px-4" onClick={placeOrder}>
                {loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
}

export default UserCart;
