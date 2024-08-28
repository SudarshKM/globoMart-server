const wishes = require("../model/wishlistModel");

//add to wishlist

exports.addToWishListController = async (req, res) => {
  const userId = req.payload;
  const { id, title, price, description, category, image, rating } = req.body;


  try {

    const existingProduct = await wishes.findOne({id,userId})

    if(existingProduct) {
        res.status(406).json("products already in your wishlist")
    } else {
        const newProduct = await wishes({
            id, title, price, description, category, image, rating ,userId
        })

        await newProduct.save()
        res.status(200).json(newProduct)
    }
    
  } catch (error) {
    res.status(401).json(error)
  }
};


//to get items from wishlist

exports.getItemsFromWishList=async(req,res)=>{
    const userId = req.payload;

    try {
        const userWishListItems= await wishes.find({userId});
        res.status(200).json(userWishListItems)
    } catch (error) {
        res.status(401).status(error)
    }
}


//remove items from wishlist

exports.removeItemsFromWishList=async(req,res)=>{
  const {id} =req.params

  console.log(id);

  try {
    await wishes.deleteOne({_id:id})
    res.status(200).json('item deleted')


  } catch (error) {
    res.status(401).json(error)
  }
  
}