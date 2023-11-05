import React from "react";
// import adminAvatar from "../images/admin-avatar.png";
// import orderIcon from "../images/order-icon.png";
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate=useNavigate()
   return (
        <div className="container">
          <div className="header mt-4 mx-auto border-bottom-1 admin-top-bar">
            <div className="admin-header d-flex justify-content-between align-items-center">
              <div className="admin-info-sec d-flex align-items-center">
                {/* Admin avatar */}
                <div className="admin-img">
                  <img className="img-fluid" alt="" />
                </div>
                <div className="admin info ms-3">
                  {/* Admin name */}
                  <h4 className="green-text fw-bold m-0">Admin</h4>
                </div>
              </div>
              {/* Order icon */}
              <div className="order-img">
                <small>
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    className="order-icon"
                    style={{ height: '30px', width: '30px', cursor: 'pointer' }}
                    onClick={() => navigate('/adminOrder')} // Navigate to '/adminOrder' when clicked
                  />
                </small>
              </div>
            </div>
          </div>
        </div>
      );
    
  
}