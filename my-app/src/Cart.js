import Shop from "./Shop";
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import './myStyles.css'

function remove(cart,product,productId,setCart,setUpdateCart,updateCart){
    fetch("http://localhost:8000/cart/delete/:id", {
        method:"DELETE",
      }).then(()=>{
        setUpdateCart({
            updateCart:!updateCart
        })
      })
      
    // cart=cart.filter(product=>product.id!==productId)
    // console.log(cart)
    // setCart({
    //     result: cart
    // })
    
    // console.log(cart)
    
    
}

function Cart(props){
    const[updateCart,setUpdateCart]=useState({
        updateCart:false
    })
    const[cart,setCart]=useState({
        //result: props.itemData,
        result: null,
        status:false,
        deletestatus:null

    })
    
      
        fetch("http://localhost:8000/cart")
        .then(res=>res.json())
        .then(
         (result)=>{
             
             setCart({
                 result:result,
                 status:!false
             })
             
         }
        )
     
    
 
    if(cart.result!=null){
        return(
            
        
            <div >
               
                <h1>Cart Page </h1>
               
                <div className="products">
                {cart.result.map(item=>
                <Card key={item.id} style={{ width: '18rem' }}>
                <Card.Img src={item.img} width={100}/>
                
                    
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                      Quantity: {item.quantity} <br></br>
                      Price:{item.price}<br></br>
                      Description: {item.desc}
                   
                  </Card.Text>
                  
                  
      
      
                  
                  
                  
                  
                </Card.Body>
                <Button variant="danger" onClick={()=>remove(cart.result,item,item.id,setCart,setUpdateCart,updateCart)} >Remove</Button>
    
                </Card>)}
                </div>
                
                
                 
    
            </div>
           
            
            
        );

    }
    
    
    
    

}
export default Cart;