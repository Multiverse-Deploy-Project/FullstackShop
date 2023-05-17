import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './myStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import AddForm from "./AddForm";
import ItemPage from "./ItemPage";
import { useNavigate, useParams } from "react-router-dom";


function removemShop(data,setItem,slug){
    
    console.log(data)
    console.log(data.id)
    fetch(`http://localhost:8000/shop/delete/${data.id}`, {
        method:"DELETE",
      }).then(()=>{
        setItem({
            
            status:"pending"
        })
      })
}
function createItem(data){
      
  const newItem={

    "id":data.id,
    "name":data.name,
    "price":data.price,
    "img":data.img,
    "desc":data.desc,
    "qunatity":0,
    "type":data.type
    
  }
  return fetch("http://localhost:8000/additem", {
    method:"POST",
    body:JSON.stringify(newItem),
    headers:{
      "Content-Type":"application/json"
    }
    
  })


}
function findItem(type,products,setNewCart,newcart,setCart,oldData){
    
    console.log(type)
    if (type===null || type===""){
        newcart=oldData
     
    }
    else{
        newcart=oldData.filter(products=>products.type===type)
    }
   
    setCart(
        newcart
        
        
    )
    //state of items: [{},{}]
    console.log("updated items")
    console.log(newcart)
    console.log("original items")
    console.log(oldData)
    







}

function Shop(props){
    
    // function popUp(inventory,available,setAvailable){
    //     if (inventory===0){

    //         setAvailable(true)
            
    //     }
    // }
    function addQ(product,updateQuantity,increment,){
        if (product.inventory!==0){
            console.log(product.inventory)
            product.quantity++
        // setProduct(products)
        updateQuantity({
            isUpdated:!increment
        })
        }
        else{
            console.log("no inventory")
            updateQuantity({
                isAvailable:false
            })

        }
        
        
    }
    function removeQ(product,updateQuantity,increment){
        if (product.inventory!==0){
            console.log(product.inventory)
            if(product.quantity>=1){
                product.quantity--
               // setProduct(products)
               updateQuantity({
                   isUpdated:!increment
               })
               
   
           }
        }
        else{
            console.log("no inventory")
            updateQuantity({
                isAvailable:false
            })
        }
        
        
        
    }
    
   
    const[Quantity, setQuantity]=useState({
        items:0,
        isUpdated:false,
        isAvailable:true
    })

    const[filter,setFilter]=useState({
        result: null
    })
    const[filterCart,setFilterCart]=useState({
        filterCart:null
    })
    
    // function addToCart(productInfo){

    // }
    const[Item,setItem]=useState({
        result:null,
        status:"pending",
        addstatus:"null"
    });
    if (Item.status!=="completed"){
      
       fetch("http://localhost:8000/items")
       .then(res=>res.json())
       .then(
        (result)=>{
            
            setItem({
                result:result,
                status:"completed"
            })
            
        }
       )
    }
    

    const [originalData,setOriginalData]=useState(Item)
   if(Item.status==="completed"){
    return(
        
        <div>
            
            
            <h1> GameMart </h1>
            
            <Form id="filter"> 
            <Form.Group>
              <Form.Label>Filter by (fighting,sports)</Form.Label>
              <Form.Control type="text" name="filter" placeholder="type" onChange={(e)=>setFilter({
                
                result:e.target.value
                
              })}  ></Form.Control>
              </Form.Group>
              <Button onClick={()=>findItem(filter.result,Item,setFilterCart,filterCart,setItem,originalData)}> Submit</Button>
             
              </Form>
            <div className="products">
                
            {Item.result.map(product=> 
            
            <Card key={product.id} greeting={"hi"} border={"dark"} className="block"  style={{ width: '20rem' }}>
            <Button className="itemButton" onClick={()=>props.addItemToPage(product)} >
            <Card.Img src={product.img} className="itemImg"  />
            </Button>
            
            
            
         
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
                 
                Price:${product.price}<br></br>
                {/* Description: {product.desc} */}
             
            </Card.Text>
            
            <Button onClick={()=>removeQ(product,setQuantity,Quantity.isUpdated,Quantity.isAvailable)} >-</Button>{product.quantity}
            <Button onClick={()=>addQ(product,setQuantity,Quantity.isUpdated,Quantity.isAvailable)} >+</Button>
                {console.log(Quantity.isAvailable)}
            <Button variant="success" onClick={()=>props.addToCart(product)} >Submit</Button>

            <Button variant="danger" onClick={()=>removemShop(product,setItem)} >Remove</Button>
            <p>Inventory: {product.inventory}</p>
            
            
          </Card.Body>
        </Card> )}
        <AddForm newItem={(data)=>{
            createItem(data).then(res=>res.json())
            .then(
             (result)=>{
                 
                 setItem({
                     
                     addstatus:"completed"
                 })
                 
             }
            )
             }
            
        } ></AddForm>
        </div>
       
        
        
        </div>
        

  
      
      
        
    );

   }
    
    
    
    

}
export default Shop;