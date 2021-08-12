const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors'); 

const app = express();



// connect Database 
connectDB(); 


//Init Middle ware
 app.use(express.json({extended: false})); 
 app.use(cors({origin: 'http://localhost:3000'}));
//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


app.get('/', (req, res)=>{res.send('API Runing')});
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`)); 

