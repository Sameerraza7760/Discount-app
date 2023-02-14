import React,{useState} from 'react'
import './style.css'
import { signinFirebase, swal, getAuth, auth } from "./../Config/firebase";

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import adminReducer from '../Redux/adminReducer/adminReducer';
function Signin() {
  const navigate=useNavigate()
  const adminData = useSelector(
    (state) => state.adminReducer.admin
  );
  console.log("admin==>",adminData)
  let [whereToNavigate, setWhereToNavigate] = useState("/home");
  const handleEmail = (e) => {
    adminData.forEach((item) => {
      if (item.email === e.target.value) {
       
       setWhereToNavigate('/adminHome')
       
        return;
      }
     
    });
  };


  async function signin() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    try {
      await signinFirebase(email, password);
      await swal("Congratulations!","Sussesfully Login", "success");
     
      navigate(whereToNavigate)
    } catch (e) {
      await swal(e.message);
    }
  }











  return (
    <div>
         <div className='sinupContainer'  >
          

          <div className='sinupInner-Container'  style={{height:'60vh'}} >
              <div className='sigup-Image'>
                  <img src="https://awamiweb.com/wp-content/uploads/2018/07/saylani-welfare.jpg" alt="" />
              </div>
              

            
      
            
      <div className="input-group flex-nowrap"  style={{width:'90%',margin:'auto'}} >
        
        <input type="text" class="form-control" placeholder="Enter Your Email" aria-label="Username" aria-describedby="addon-wrapping" id='email'onChange={handleEmail} />
      </div>
            
      <div className="input-group flex-nowrap"  style={{width:'90%',margin:'auto'}} >
        
        <input type="text" class="form-control" placeholder="Enter Your Password" aria-label="Username" aria-describedby="addon-wrapping" id='password' />
      </div>
       
        <button className='sigupButton'  onClick={signin} >Sigin</button>
          </div>
      
          </div>
    </div>
  )
}

export default Signin