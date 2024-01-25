import React from "react";
import Footer from "../../../Components/Footer/Adminfooter/Footer";
import {
  swal,
  auth,
  doc,
  db,
  setDoc,
  uploadBytes,
  ref,
  storage,
  getDownloadURL,
} from "../../../Config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import Navbar from "../../../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";

function Account() {
  const [authData, setauthData] = useState(
    useSelector((state) => state.adminReducer.admin)
  );
  const [added, setAdded] = useState("");

  // console.log("admin", authData);
  const navigate = useNavigate();

  async function logout() {
    await auth.signOut();

    await swal("logout Sussesfully");

    navigate("/");
  }
  const updateFullname = async () => {
    const fullName = document.getElementById("fullName").value;
    if (!fullName) {
      swal("Please enter name to update!");
      return;
    }
    const docRef = doc(db, "Admin", `${authData[0].id}`);
    const updatedData = { email: authData[0].email, fullName: fullName };
    await setDoc(docRef, updatedData);
    swal(
      "Updated",
      `Congrats ${fullName} your name updated Successfully!`,
      "success"
    );
  };

  const addCategory = async () => {
    if (!document.getElementById("categoryImage").files[0]) {
      swal("Select Image to Create category.");
      return;
    }
    const categoryImage = await uploadImage(
      document.getElementById("categoryImage").files[0]
    );
    const categoryName = document.getElementById("categoryName").value;
    const categoryObjInfo = {
      categoryImgUrl: categoryImage,
      categoryName: categoryName,
    };
    const categoryId = authData[0].id + Date.now();
    const myCategoryRef = doc(db, "categories", `${categoryId}`);
    await setDoc(myCategoryRef, categoryObjInfo);
    swal("Added", "Congrats! Category Added successfully", "success");
    setAdded("added");
  };
  const uploadImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="admin-head d-flex flex-column align-items-center">
          <p className="text-center mt-2 fs-5 text-primary">Settings</p>
          <img width="100" alt="" />
          <div className="input-group w-75 mt-2">
            <input
              className="form-control border-end-0"
              type="text"
              placeholder="Update Fullname"
              id="fullName"
            />
            <span
              className="input-group-append d-flex align-items-center px-2"
              style={{ backgroundColor: "#198754" }}
              onClick={updateFullname}
            >
              <CheckIcon style={{ cursor: "pointer", color: "white" }} />
            </span>
          </div>
        </div>
        <div className="category-add d-flex flex-column align-items-center mt-3">
          <div className="mb-3 w-75" style={{ border: "1px solid grey" }}>
            <input className="form-control"  type="file" id="categoryImage" />
          </div>
          <div className="input-group w-75">
            <input
              className="form-control "
              type="text"
              placeholder="Category Name"
              id="categoryName"
            />
            <button className="btn btn-success" onClick={addCategory}>
              Add
            </button>
          </div>
        </div>
        <div className="all-categories mt-4 d-flex flex-column align-items-center fw-bold blue-text">
          <p>All Categories</p>

          <div className="overflow-y w-75">
            {/* {categories.map((item, index) => {
              return (
                <div
                  className="hp-card d-flex align-items-center mb-3 justify-content-between"
                  key={index}
                >
                  <div className="p-img">
                    <img
                      src={item.categoryImgUrl}
                      className="img-fluid"
                      width="50px"
                      alt=""
                    />
                  </div>
                  <div className="p-info d-flex">
                    <p className="green-text fw-bold mt-2">
                      {item.categoryName}
                    </p>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>

      <button className="loginBtn mt-1 fw-bold px-4" onClick={logout}>
        Log out
      </button>

      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
}

export default Account;
