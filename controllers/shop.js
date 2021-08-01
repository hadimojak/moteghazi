const fetch = require("node-fetch");
const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  const ITEM_PER_PAGE = 5;
  const PAGE = 1;
  const url = `https://moteghazi.com/api/1.0.0/requirement/requirements`;

  const response = await fetch(url);
  const data = await response.json();

  const products = data.requirements;
  console.log(products[0]);
  //   products.forEach(async (p) => {

  //     // we store the products in mongo db atlas this code is just run one time for use your own data

  //     const title = p.title;
  //     const description = p.description;
  //     const imageUrl = p.thumbnail;
  //     const code = p.code;
  //     const product = new Product({
  //       title: title,
  //       description: description,
  //       imageUrl: imageUrl,
  //       code: code,
  //     });
  //     try {
  //       await product.save();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });

  try {
    const totalItems = await Product.find().countDocuments();
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip((PAGE - 1) * ITEM_PER_PAGE) // for pagination in front
      .limit(ITEM_PER_PAGE);
    console.log(totalItems);

    res.status(200).json({
      message: "all products",
      products: products,
      totalItems: totalItems,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductPage = async (req, res, next) => {
  const productCode = req.params.productCode;
  console.log(productCode);
  const product = await Product.find({ code: productCode });
  res.status(200).json({ message: "porudct page", product: product });
};
