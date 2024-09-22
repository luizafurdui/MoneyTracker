require('dotenv').config(); // Ensure this is at the top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your model
const Transaction = require('./models/transaction');

const app = express();

app.use(cors());
app.use(express.json());


app.post('/api/transaction', async (req, res) => {    
   
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const { name, description, datetime,price } = req.body;
        
        const transaction = await Transaction.create({ name, description, datetime,price });
        res.json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error); 
        res.status(500).json({ message: "Failed to create transaction", error: error.message });
    }
});

app.get('/api/transactions', async (req, res)=>{

     await mongoose.connect(process.env.MONGO_URL);
     const transactions = await Transaction.find()
     res.json(transactions); 
    

})

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
