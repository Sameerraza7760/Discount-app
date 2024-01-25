import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  addUserToDB,
  auth,
  createUserWithEmailAndPassword,
  swal,
} from "../../../Config/firebase/firebase";
import "./../style.css";
function Signup() {
  const signupFirebase = async () => {
    try {
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const contact = document.getElementById("contact").value;
      if (fullName.length === 0 || contact.length === 0) {
        swal({
          icon: "error",
          title: "Oops...",
          text: "username required",
        });
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      const userData={fullName,email,contact}
      await addUserToDB(userData);
      swal({
        title: "Congrats! Sigup Successfully.",
        width: 600,
        padding: "3em",
      });
      navigate("/Signin");
      window.scrollTo(0, 0);
    } catch (e) {
      swal({
        icon: "error",
        title: "Oops...",
        text: e.message,
      });
    }
  };
  const navigate = useNavigate();
  return (
    <div className="signMain">
      <h1 className="green-text mt-5 " style={{ color: "#61b846" }}>
        SAYLANI WELFARE
      </h1>
      <p className="blue-text fw-bold mt-3">ONLINE DISCOUNT STORE</p>
      <div className="signupInpsDiv">
        <TextField
          id="fullName"
          className="signupInp"
          label="FullName"
          variant="standard"
          placeholder="Enter Your FullName"
        />
      </div>
      <div className="signupInpsDiv">
        <TextField
          className="signupInp"
          label="Contact"
          id="contact"
          variant="standard"
        />
      </div>
      <div className="signupInpsDiv">
        <TextField
          className="signupInp"
          label="Email"
          id="email"
          autoComplete="off"
          variant="standard"
        />
      </div>
      <div className="signupInpsDiv">
        <TextField
          id="password"
          className="signupInp"
          label="Password"
          variant="standard"
          type={"password"}
          autoComplete="off"
        />
      </div>

      <button onClick={signupFirebase} className="signupBtn">
        Sign Up
      </button>
      <div>
        <p className="text-center mt-4 blue-text fw-bold c-pointer ">
          Already have an account ?{" "}
          <span onClick={() => navigate("/Signin")} className="c-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
export default Signup;
