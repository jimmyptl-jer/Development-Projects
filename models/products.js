const fs = require('fs');
const path = require('path');

const getProductsFromFile = cb => {
  const p = path.join(__dirname, '../data/products.json');
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // Handle the file read error by passing an empty array to the callback
      cb([]);
    } else {
      try {
        // Attempt to parse the file content as JSON
        const products = JSON.parse(fileContent);
        cb(products); // Pass the parsed data to the callback
      } catch (jsonParseError) {
        // Handle JSON parsing errors by passing an empty array to the callback
        console.error('Error parsing JSON:', jsonParseError);
        cb([]);
      }
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);

      const p = path.join(__dirname, '../data/products.json');
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
