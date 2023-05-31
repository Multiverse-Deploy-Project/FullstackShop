import React from 'react';
import { Routes, Route,Link } from "react-router-dom";
import Home from './Home';
import Cart from './Cart';
import Shop from './Shop';
import ReviewForm from './Review';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav'
import LoginForm from './LoginForm';
import './App.css'
import ItemPage from './ItemPage';
import { useNavigate } from 'react-router-dom';
//test
function handleClick(product,navigate){
  
  navigate("/itempage/"+product.id)



  
  
}
function pushToCart(data){

  if (data!=null&& data.quantity!==0){
    console.log(data)
    fetch("http://localhost:8000/addToCart", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
				{
          //user_id: req.body.user_id,
          id:data.id,
          name: data.name,
          price:data.price,
          img: data.img,
          desc:data.desc,
          quantity:data.quantity,
          type:data.type
				}
			)
        })
  }
}

function App() {
  const navigate=useNavigate();
  const[itemData,setItemData]=useState({
    itemData:null
  })
  const[cart,setNewCart]=useState({
    cart:[]
})

const[userReview,setUserReview]=useState({
  reviews:[],
  recieved:false,
  
})
  return (

    <div className="App">
       <div className="topnav">
        
        <Nav>
          <Nav.Item><Nav.Link as={Link} to="/shop"> Shop </Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link as={Link} to="/cart"> Cart </Nav.Link></Nav.Item>
          <Nav.Item> <Nav.Link as={Link} to="/home"> Home </Nav.Link></Nav.Item>
          {/* <Nav.Item> <Nav.Link as={Link} to="/itempage"> Item </Nav.Link></Nav.Item> */}
          <Nav.Item id="login"><LoginForm></LoginForm></Nav.Item>
          
        </Nav>
          

        
        
         
         

        
        
        <Routes>
            <Route path="/home" element={
                <Home userData={userReview.reviews}/>
                
            } />

            <Route path="/review" element={

                <ReviewForm />
                
            } />
             
             <Route path="/shop" element={
                <Shop addToCart={(cardData)=>pushToCart(cardData)}
                addItemToPage={(product)=> handleClick(product,navigate)
                
              }  />
            } />
            <Route path="/cart" element={
               
               <Cart  itemData={cart.cart}   />
           } />
           <Route path="/itempage/:itemid" element={
               
               <ItemPage     />
           } />
           
          {/* added my-app */}
        </Routes>
    
        </div>


      
     
    </div>
  );
}

export default App;
