const mongodb = require('mongodb');
const Product = require('../models/product');

const objectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })

  product.save().then(results => {
    console.log("Product Created", results);
    res.redirect('/admin/products')
  }).catch(err => {
    console.log("Error")
  })
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Admin products',
        prods: products,
        path: '/admin/products'
      })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const productId = req.params.productId;

  Product.findById(productId).then(product => {
    console.log(product);
    if (!product) {
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product,
      editing: editMode
    })
  }
  ).catch(err => {
    console.log("Error while deleting the products", err)
  }

  )
}

exports.postEditProducts = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.findById(productId).then(product =>{
    product.title = updatedTitle,
    product.price = updatedPrice,
    product.imageUrl=updatedImageUrl,
    product.description=updatedDescription

    return product.save()
  }).then(()=>{
    console.log("Product updated");
    res.redirect('/admin/products')
  }).catch(err =>{
    console.log("Error while updating product",err)
  })

  
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByIdAndDelete(productId).then(() => {
    console.log("Product Deleted Success");
    res.redirect('/admin/products');
  }
  ).catch(err => {
    console.log("Error in deleting product check controller", err)
  })
}