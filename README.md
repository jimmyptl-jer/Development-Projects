# NodeJS

https://medium.com/@manishsundriyal/a-quick-way-for-hashing-passwords-using-bcrypt-with-nodejs-8464f9785b67

Certainly! Here's how you can convert the provided information into a GitHub README:

---

# Bcrypt Password Hashing in Node.js

Bcrypt is a password hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher. It provides a secure way to hash passwords in Node.js applications. This guide will show you how to use the bcrypt module to hash passwords and store them securely.

## Installation

First, install the bcrypt module via npm:

```bash
npm install --save bcrypt
```

## Cryptography Terms

Before we dive into the implementation, let's understand some important terms:

- **Salt:** A random data used as an additional input to a one-way function that hashes data.
  
- **Salt Rounds:** The cost factor indicating the time needed to calculate a single bcrypt hash. Higher salt rounds increase the time and difficulty of brute-forcing.

## Implementation

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;
const yourPassword = "someRandomPasswordHere";
```

There are two ways to hash a password using bcrypt:

### 1. Generate a Salt and Hash on Separate Function Calls

```javascript
bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(yourPassword, salt, (err, hash) => {
        // Store the password hash in the database.
    });
});
```

### 2. Auto-generate a Salt and Hash on the Same Function Call

```javascript
bcrypt.hash(yourPassword, saltRounds, (err, hash) => {
    // Store the password hash in the database.
});
```

To compare a user-entered password with the stored password hash:

```javascript
// Load hash from the database.
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    if (res == true) {
        // Password matched.
    } else {
        // Wrong password.
    }
});
```

Both methods mentioned above can also be achieved with promises, as these methods (`hash` and `compare`) return a Promise when a callback is not defined.

Bcrypt also provides synchronous methods like `genSaltSync`, `hashSync`, and `compareSync`, but asynchronous methods are preferred to prevent blocking the event loop, as bcrypt hashing is CPU intensive.

For more information, please refer to the [bcrypt documentation](https://www.npmjs.com/package/bcrypt).

---

You can create a new README.md file in your GitHub repository and paste this content there. Don't forget to adjust the formatting and add additional sections or details as needed for your specific use case.
