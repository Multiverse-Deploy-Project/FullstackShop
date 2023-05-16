import ReviewForm from "./Review";
import Card from 'react-bootstrap/Card';
import { useState } from "react";
function addReview(data,addedReviews,setUpdated,check){
    //data represents the review that was submitted
    if (data!=null){
      if (data!=null){
        fetch("http://localhost:8000/addReview", {
          method: "POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
      {
        
        _id: data._id,
        item_id:data.item_id,
        name: data.name,
        message:data.message
      }
    )
      })
        
      }
        //userreview.reviews(list of reviews)
        addedReviews.push(data)
        
        //setstate for reviews 
        setUpdated({
            
            reviews: addedReviews,
            //recieved
            
            
            recieved:!check
        })
        
        
      }

    
  }
function Home(props){
    const[userReview,setUserReview]=useState({
        reviews:props.userData,
        recieved:false,
        
      })
    return(
        <div>
              <h1>Home Page </h1>
        <ReviewForm sendReview={(reviewData)=>addReview(reviewData,userReview.reviews,setUserReview,userReview.recieved)}></ReviewForm>
        
        <h1>User Reviews</h1>
        
        
        {userReview.reviews.map(post=>
          <Card>
            
            <Card.Title>{post.name}</Card.Title>
            <Card.Body>{post.message}</Card.Body>

          </Card>)}
        


        </div>
      
        
    );
    
    

}
export default Home;