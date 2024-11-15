import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());    // allows us to accept JSON data in the req.body

app.post("/api/products", async (req, res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all the required fields"});
    }

    const newProduct = new product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.log('Error in Create product: ', error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
});

// console.log(process.env.MONGO_URI);


app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
});

// Password:Ivspf8t6EIKAAA7p