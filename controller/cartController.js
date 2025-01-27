const carts = require("../model/cartModel");

exports.addToCartController = async (req, res) => {
  const userId = req.payload;
  const { id, title, price, description, category, image, rating } = req.body;

  try {
    const existingProduct = await carts.findOne({ id, userId });

    if (existingProduct) {
      // res.status(406).json("products already in your cart");
      existingProduct.quantity += 1;
      existingProduct.grandTotal =
        existingProduct.quantity * existingProduct.price;

      await existingProduct.save();

      res.status(200).json(existingProduct);
    } else {
      const newProduct = await carts({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        quantity: 1,
        grandTotal: price,
        userId,
      });

      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//to get items from cart

exports.getItemsFromCart = async (req, res) => {
  const userId = req.payload;

  try {
    const userCartItems = await carts.find({ userId });
    res.status(200).json(userCartItems);
  } catch (error) {
    res.status(401).status(error);
  }
};

//remove item from cart

exports.decrementCartItem = async (req, res) => {
  const userId = req.payload;
  const { id, title, price, description, category, image, rating } = req.body;

  try {
    const existingProduct = await carts.findOne({ id, userId });

    if (existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;

      await existingProduct.save()
      res.status(200).json(existingProduct);
    } else {
      await carts.deleteOne({id});
      res.status(200).json("deleted");

    }
    
  } catch (error) {
    res.status(401).json(error);
  }
};



exports.deleteCartItemController = async (req, res) => {
  const { id } = req.params;
  try {
    await carts.deleteOne({id});
    res.status(200).json('deleted')
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.emptyCartController = async (req,res)=>{
  const userId = req.payload;

  try {
    await carts.deleteMany({userId});
    res.status(200).json('deleted')

  } catch (error) {
    res.status(401).json(error);

  }
}
