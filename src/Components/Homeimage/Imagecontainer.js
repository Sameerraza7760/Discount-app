import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "./../../images/image1.jpg";
import "./../style.css";

function Imagecontainer() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="image1-container"
        style={{ display: "flex", width: "85%" }}
      >
        <div className="space_container" style={{ width: "98%" }}></div>
        <div
          className="i-container"
          style={{
            width: "2%",
            cursor: "pointer",
            display: "flex",
            marginRight: "6%",
          }}
        >
          <ChatBubbleOutlineIcon
            style={{ color: "green", height: "30px", marginRight: "7px" }}
            onClick={() => navigate("/userchat")}
          />
          <FontAwesomeIcon
            style={{ color: "green", height: "30px" }}
            icon={faShoppingCart}
            onClick={() => navigate("/userCart")}
          />
        </div>
      </div>
      <div
        className="mt-2 mb-5 userBg"
        style={{ width: "80%", height: "280px", margin: "auto" }}
      >
        <img src={image1} alt="" className="img-fluid d-block mx-auto w-m-50" />
      </div>
    </>
  );
}

export default Imagecontainer;
