import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cartItem from '../../Redux/cartaction/cartaction';
import UserFooter from '../Footer/Userfooter/UserFooter';
import Imagecontainer from '../Homeimage/Imagecontainer';
import {
  collection,
  db,
  getDocs
} from "./../../Config/firebase/firebase";
import './../style.css';

function Home() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
 
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
  
    useEffect(() => {
      const getProducts = async () => {
        const querySnapshot = await getDocs(collection(db, 'adminItems'));
        const myProducts = [];
        querySnapshot.forEach((doc) => {
          myProducts.push({ id: doc.id, ...doc.data() });
        });
        setAllProducts(myProducts);
      };
      getProducts();
  
      const getCategories = async () => {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const myCategories = [];
        querySnapshot.forEach((doc) => {
          myCategories.push({ id: doc.id, ...doc.data() });
        });
        setCategories(myCategories);
      };
      getCategories();
    }, []);
  
    const filterByCategory = async () => {
      const querySnapshot = await getDocs(collection(db, 'adminItems'));
      const myProducts = [];
      querySnapshot.forEach((doc) => {
        myProducts.push({ id: doc.id, ...doc.data() });
      });
      if (document.getElementById('productCategory').value === 'all') {
        setAllProducts(myProducts);
        return;
      }
  
      const categoryToFilter = document.getElementById('productCategory').value;
      const filteredCategories = myProducts.filter((item) => item.productCategory === categoryToFilter);
      setAllProducts(filteredCategories);
    };
  
    const CartItems = (item) => {
      dispatch(cartItem(item));
      toast.success(`${item.productName} added to cart!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    };
  
    return (
      <>
       <div  style={{paddingBottom:'10%'}} >
       <h1 className="green-text mt-5" style={{ color: '#61b846' }}>
          SAYLANI WELFARE
        </h1>
        <p className="blue-text fw-bold mt-3" style={{ fontSize: '20px' }}>
          ONLINE DISCOUNT STORE
        </p>
        <div>
          <Imagecontainer />
        </div>
        <div className="categories">
          <h6 className="green-text filterHead">filter by category</h6>
          <select
            id="productCategory"
            onChange={() => filterByCategory()}
            className="form-control mb-2 border-1"
         
          >
            <option className="filterOpt" value={'all'}>
              {'All'}
            </option>
            {categories.map((item, index) => {
              return (
                <option
                  key={index}
                  className="filterOpt"
                  value={item.categoryName}
                >
                  {item.categoryName}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className="products d-flex flex-column"
          style={{ marginBottom: '5em', margin: 'auto', width: '80%',height:'400px' }}
        >
          {allProducts.length ? allProducts.map((item, index) => {
            return (
              <div
                className="product d-flex justify-content-between w-100 align-items-center mb-5"
                key={index}
                style={{
                  border: '1px solid #579b42',
                  padding: '10px',
                  borderRadius: '20px',
                }}
              >
                <div className="product-image">
                  <img
                    src={item.adminImage}
                    width={'120px'}
                    alt=""
                    style={{ maxWidth: '100%' }}
                  />
                </div>
                <div className="product-details w-25 mx-auto">
                  <div className="product-title fw-bold">{item.productName}</div>
                  <div className="product-description">{item.productDesc}</div>
                </div>
                <div className="cart-price">
                  <p className="m-0">{item.unitPrice}</p>
                  <p>{item.unitName}</p>
                  <button
                    className="btn btn-success"
                    style={{ height: '50px', width: '50px' }}
                    onClick={() => CartItems(item)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            );
          }): <h3>No Products</h3>}
        </div>
       </div>
        <UserFooter />
      </>
    );
  }
  
  export default Home;