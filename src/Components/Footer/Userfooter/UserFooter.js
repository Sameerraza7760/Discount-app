import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { faHome } from '@fortawesome/free-solid-svg-icons';
function UserFooter() {
    const navigate=useNavigate()
  return (
    <div>
            <div className="container footer-container">
                <div className="footer-sec d-flex text-center justify-content-between align-items-center">
                    <div className="footer-item">
                        <i className="fa fa-home" aria-hidden="true"></i><br />
                        <h6 className='text-secondary fw-bold'  onClick={()=>navigate('/home')} style={{cursor:'pointer'}} ><FontAwesomeIcon icon={faHome} /><br />Home</h6>
                    </div>
                    <div className="footer-item">
                    <i className="fa fa-plus-circle" aria-hidden="true"    style={{cursor:'pointer'}} ></i><br />
                        <h6 className='text-secondary fw-bold'  onClick={()=>navigate('/userCart')} style={{cursor:'pointer'}} ><FontAwesomeIcon icon={faShoppingCart} /> <br /> Cart</h6>
                    </div>
                    <div className="footer-item">
                        <i className="fa fa-user" aria-hidden="true" style={{cursor:'pointer'}}   ></i><br />
                        <h6 className='text-secondary fw-bold'  onClick={()=>navigate('/userSetting')}  style={{cursor:'pointer'}} ><AccountCircleIcon />   <br />Account</h6>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default UserFooter