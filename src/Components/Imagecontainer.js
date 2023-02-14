import React from 'react'
import image1 from './images/image1.jpg'
import './style.css'

function Imagecontainer() {
  return (
 <>
    <div className='image1-container' >
<div className='heading-Container' ><h1>Saylani Welfare</h1></div>
<div className='space_container'></div>
<div className='i-container' ><i className="fa-solid fa-basket-shopping"></i></div>
</div>
<div className='image1-Container'>
   <img src={image1} alt=""/>
</div>
<div className="input-group flex-nowrap"  style={{width:'80%',margin:'auto',marginTop:'4%',height:'50px'}} >
         <input type="Search" class="form-control" placeholder="Enter Items" aria-label="Username" aria-describedby="addon-wrapping" id='allItemsHere' />
      </div>
            
</>


  )
}

export default Imagecontainer