
import { useNavigate } from "react-router-dom"



export default function Footer() {
    const navigate=useNavigate()
    return (
        <div>
            <div className="container footer-container">
                <div className="footer-sec d-flex text-center justify-content-between align-items-center">
                    <div className="footer-item">
                        <i className="fa fa-home" aria-hidden="true" style={{cursor:'pointer'}}></i><br />
                        <h6 className='text-secondary fw-bold'>Home</h6>
                    </div>
                    <div className="footer-item">
                    <i className="fa fa-plus-circle" aria-hidden="true"    style={{cursor:'pointer'}} ></i><br />
                        <h6 className='text-secondary fw-bold'  onClick={()=>navigate('/adminItem')} style={{cursor:'pointer'}} >Add item</h6>
                    </div>
                    <div className="footer-item">
                        <i className="fa fa-user" aria-hidden="true" style={{cursor:'pointer'}}   ></i><br />
                        <h6 className='text-secondary fw-bold'  onClick={()=>navigate('/Account')}  style={{cursor:'pointer'}} >Account</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}