import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { db,getDocs,collection,swal,auth } from '../../../Config/firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import UserFooter from '../../../Components/Footer/Userfooter/UserFooter'

function UserSetting() {
const navigate=useNavigate()
  const [order,setOrder]=useState([])
  const [FilteredOrder,setFilterOrder]=useState([])

  useEffect(() => {
    const getOrder = async()=> {
            const querySnapshot = await getDocs(collection(db, "orderItem"))
            setOrder(querySnapshot.docs.map((doc) =>({ id: doc.id, ...doc.data()})))}
              getOrder()
  },[]);
 
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          const filteredOrders = order.filter((item) => item.id.slice(0, 28) === user.uid);
          setFilterOrder(filteredOrders)
        });
      }, [order]);
      
async function logout() {
  await auth.signOut();
  await swal({
     title: 'Congrats! Logged Out Successfully.',
 })
 navigate('/')}
const convertMillisecondsToTime = (milliseconds) => {
  const date = new Date(milliseconds);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amPm = 'AM';
  if (hours > 12) {
      hours -= 12;
      amPm = 'PM';
  }
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  return `${hours}:${minutes} ${amPm}`;
};
  return (
   <>
    <div className="container" style={{width:'90%'}} >
    <div className="admin-head d-flex flex-column align-items-center">
        <p className='text-center mt-2 fs-5 text-primary'>Settings</p>
        <img  width="100" alt="" />
        <div className="input-group w-75 mt-2">
            <input className="form-control border-end-0" type="text"  placeholder="Update Fullname" id="update-fullname" />
            <span className="input-group-append d-flex align-items-center px-3" style={{ backgroundColor: "#198754" }}>
                {/* <CheckIcon  style={{ cursor: "pointer", color: "white" }} /> */}
                <FontAwesomeIcon icon={faCheck} className="thick-tick-icon"   style={{ cursor: "pointer", color: "white" }} /> 
            </span>
        </div>
    </div>
    <div className="order-sec container" style={{ marginBottom: "6em",width:'100%' }}>
        <h6 className='my-2 blue-text fw-bold'>Orders</h6>



         {
            FilteredOrder.map((item, index) => {
                return <div className="orders d-flex justify-content-between" key={index}>
                    <div className="user-bio">
                        <p className='m-0 fw-bold'>{item.fullName}</p>
                        <small>{convertMillisecondsToTime(item.time)} - {item.status}</small>
                        <div className="p-items mt-3">

                            {
                                item.cartItem.map((e, index) => {
                                    return <small key={index}>  1x {e.productName} <br /></small>
                                })
                            } 

                        </div>   
                        <hr />
                        <p>  TOTAL: {item.orderPrice}</p>

                    </div>
                  
                    <div className="userdata" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <p className="number fw-bold">{item.contact}</p>
                        <p className="price green-text fw-bold">{item.itemPrice}</p>
                    </div>
                  
                  
                </div>
        
            })
           
        }
        <div className="signup-btn text-center">
            <button  className="loginBtn mt-1 fw-bold px-4" onClick={logout} >
                Log out
            </button> 
        </div>
    </div>
</div>
<UserFooter/>
</>
  )
}

export default UserSetting