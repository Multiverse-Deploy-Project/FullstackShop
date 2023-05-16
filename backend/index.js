
require("dotenv").config()
const cors=require('cors');
const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}));

// const bodyParser = require("body-parser")


//testing push


app.use(cors({
    origin:'*'
}));
app.use(express.json());

app.listen(8000, () => console.log("Server is running"));

const mongoose = require("mongoose")

mongoose.connect(process.env.REACT_APP_MONGODB_URI, {
  useNewUrlParser: "true",
});

// mongoose.connection.on("error", (err) => {
//   console.log("err", err);
// });

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

const userSchema=new mongoose.Schema({
  email: String,
  password: String
})

const reviewSchema=new mongoose.Schema({
    //  _id:Number,
     item_id:Number,
    name:String,
    message:String
})
//fix schema each document should have a list of items?
const cartSchema=new mongoose.Schema({
    user_id: Number,
    id:Number,
    name: String,
    price:String,
    img: String,
    desc:String,
    quantity:Number,
    type:String

})
const itemSchema=new mongoose.Schema({
    id:Number,
    name: String,
    price:String,
    img: String,
    desc:String,
    quantity:Number,
    type:String

})

const Review = mongoose.model('Review',reviewSchema)
const Item=mongoose.model('Items',itemSchema)
const Cart=mongoose.model('Carts',cartSchema)
const User=mongoose.model('Users',userSchema)



//review routes
//get all reviews
app.get('/reviews', async (req,res)=>{
    
  const allReviews=await Review.find()
  res.json(allReviews)
  


  });


app.get('/reviews/:id', async (req,res)=>{

    
  console.log(req.params.id)
  const itemReviews=await Review.find({item_id:req.params.id})
  
  res.json(itemReviews)
    
  
  
    });

//create review

//test
app.get('/test',(req,res)=>{
    res.send({message: "Hello from backend!"})
})

app.post('/addReview', async (req,res)=>{
  const newReview = await Review.create({
    // _id: 0,
    item_id:req.body.item_id,
    name: req.body.name,
    message:req.body.message
    
});
res.json(newReview)
})


   //shop routes
app.get('/items', async(req,res)=>{
    const allItems= await Item.find()
    res.json(allItems)
})
//find item by id
app.get('/items/:id', async(req,res)=>{
  const oneItem=await Item.findOne({id:req.params.id})
  res.json(oneItem)
})

//cart routes
app.get('/cart', async(req,res)=>{
  const allCart= await Cart.find()
  res.json(allCart)

});


app.post("/addToCart", async (req,res)=>{
  const newCart = await Cart.create({
    user_id: req.body.user_id,
    id:req.body.id,
    name: req.body.name,
    price:req.body.price,
    img: req.body.img,
    desc:req.body.desc,
    quantity:req.body.quantity,
    type:req.body.type
});

res.json(newCart)
})

app.delete("/cart/delete/:id", async(req,res)=>{
  product=await Cart.deleteOne()
  await Cart.findById(product.id)
  res.json(await Cart.find())
})
   



//login routes

app.get('/users',async (req,res)=>{
  const allUsers=await User.find()
  res.json(allUsers)
})

app.post("/adduser", async (req,res)=>{
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password
});

res.json(newUser)
})
    

//admin routes

app.post("/additem", async (req,res)=>{
  const newItem = await Item.create({

    id:req.body.id,
    name:req.body.name,
    price:req.body.price,
    img:req.body.img,
    desc:req.body.desc,
    qunatity:req.body.quantity,
    type:req.body.type
    
    
});

res.json(newItem)
})

app.delete("/shop/delete/:id", async(req,res)=>{
  console.log("remove from cart")
  console.log(req.params.id)
  await Item.findOneAndDelete({id:req.params.id})
  
  res.json(await Item.find())

  // product=await Item.deleteOne()
  // await Item.findById(product.id)
  // res.json(await Item.find())
})


