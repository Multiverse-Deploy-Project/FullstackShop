import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import Home from "./Home";
import { useParams } from "react-router-dom";


function getReviews(userReview,setUserReview,id){
    //console.log(userReview)
    console.log("item id")
    console.log(id)
    fetch(`http://localhost:8000/reviews/${id}`)
       .then(res=>res.json())
       
       .then(
        (result)=>{
            //console.log(result)
            setUserReview({
                reviews:result,
                
            })

            
        }
        
       )
      
      
       
}

    
function ItemPage(props){
    
     const params=useParams();
    const[userReview,setUserReview]=useState({
        reviews:null,
        recieved:false,
        
      })
    const [product,setProduct]=useState({
        product:null,
        productId:null
        
    })
   if (product.product === null){

    fetch(`http://localhost:8000/items/${params.itemid}`)
       .then(res=>res.json())
       .then(
        (result)=>{
            
            setProduct({
                product:result,
                
                
            })
            getReviews(userReview,setUserReview,params.itemid)
        
        }
        
       )
       
   }
   
    
    // if (userReview.reviews===null ){
    //     getReviews(userReview,setUserReview,product.productId)
    // }
    

   if(product.product===null || userReview.reviews===null){
    
        return(
            <h1>Item {params.itemid} not found</h1>
            
        )
   }

   else{
    
    return(
        
       
        <div>
             
            <Card key={product.product.id}  border={"dark"} className="block"  style={{ width: '18rem' }}>
            
            <Card.Img src={product.product.img} className="itemImg"  />
            
            
         
          <Card.Body>
            <Card.Title>{product.product.name}</Card.Title>
            <Card.Text>
                 
                Price:{product.product.price}<br></br>
                Description: {product.product.desc} 
             
            </Card.Text>
            
            
            
            
          </Card.Body>
          
          
          </Card>
          <h1>User Reviews</h1>
          {userReview.reviews.map(post=>
            <Card>
                <h1>Name: {post.name}</h1>

                <h2>Post: {post.message}</h2>

            </Card>)}
           {/* <p>reviews:{JSON.stringify(userReview.reviews)}</p>  */}
        
       
        </div>
        
        
        
        
    );
    
   
   }
   
 }

export default ItemPage