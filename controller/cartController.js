const carts = require("../model/cartModel");

exports.addToCartController = async (req, res) => {
  const userId = req.payload;
  const { id, title, price, description, category, image, rating } = req.body;

  try {
    const existingProduct = await carts.findOne({ id, userId });

    if (existingProduct) {
      res.status(406).json("products already in your cart");
    } else {
      const newProduct = await carts({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
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