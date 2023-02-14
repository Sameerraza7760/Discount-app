import React from "react";
import {
  SignupFirebase,
  swal,
  createUserWithEmailAndPassword,
  auth,
  addUserToDB,
} from "./../Config/firebase";
import { useNavigate } from "react-router-dom";

import "./style.css";

function Signup() {
  const navigate = useNavigate();

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
      await addUserToDB(fullName, contact);
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

  return (
    <div className="sinupContainer">
      <div className="sinupInner-Container">
        <div className="sigup-Image">
          <img
            src="https://awamiweb.com/wp-content/uploads/2018/07/saylani-welfare.jpg"
            alt=""
          />
        </div>

        <div
          className="input-group flex-nowrap"
          style={{ width: "90%", margin: "auto" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your FullName"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            id="fullName"
          />
        </div>

        <div
          className="input-group flex-nowrap"
          style={{ width: "90%", margin: "auto" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Contact"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            id="contact"
          />
        </div>

        <div
          className="input-group flex-nowrap"
          style={{ width: "90%", margin: "auto" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Email"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            id="email"
          />
        </div>

        <div
          className="input-group flex-nowrap"
          style={{ width: "90%", margin: "auto" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Password"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            id="password"
          />
        </div>

        <button className="sigupButton" onClick={signupFirebase}>
          Signup
        </button>
        <button className="Regesterbtn" onClick={() => navigate("/Signin")}>
          Regester
        </button>
      </div>
    </div>
  );
}

export default Signup;
