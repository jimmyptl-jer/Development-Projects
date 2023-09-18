const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);

  // Save the product and handle errors
  product.save((err) => {
    if (err) {
      // Handle the error (e.g., validation error) appropriately
      console.error('Error saving product:', err);
      // You might want to render an error view or redirect back to the add-product page with an error message
      return res.redirect('/admin/add-product');
    }
    res.redirect('/');
  });
}

exports.getProducts = (req,res,next)=>{
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Products List',
      path: '/admin/products',
    });
  });
}