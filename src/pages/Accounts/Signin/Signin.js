import React,{useState} from 'react'
import './../style.css'
import { signinFirebase, swal } from "../../../Config/firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
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
    <div className="signMain">
    <h1 className="green-text mt-5 " style={{ color: "#61b846" }}>
      SAYLANI WELFARE
    </h1>
    <p className="blue-text fw-bold mt-3">ONLINE DISCOUNT STORE</p>

    <div className="signupInpsDiv">
      <TextField
        className="signupInp"
        label="Email"
        id="email"
        variant="standard"
        onChange={handleEmail}
      />
    </div>
    <div className="signupInpsDiv">
      <TextField
        id="password"
        className="signupInp"
        label="Password"
        variant="standard"
        type={'password'}
      />
    </div>

    <button onClick={signin}className="loginBtn">
      Login
    </button>

    <div>
      <p className="text-center mt-4 blue-text fw-bold c-pointer ">
        Dont have an account ?
        <span onClick={() => navigate("/Signup")} className="c-pointer">
          Sign Up
        </span>
      </p>
    </div>
  </div>
  )
}

export default Signin