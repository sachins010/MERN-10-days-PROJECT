const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app=express();
const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(cors());

//MySQL COnnection
const ecomdb = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'ecomdb',
});

ecomdb.connect((err)=>{
    if(err){
        console.log("MySQL connection failed",err);
    }else{
        console.log("connected to MySQL database");
    }
});

// customer table
ecomdb.query(
    "CREATE TABLE IF NOT EXISTS custmerDetail(id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(25) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(40) NOT NULL, mobile_No VARCHAR(10) NOT NULL, address VARCHAR(50))",
    (err)=>{
        if(err){
            console.log("failed to create the table");
        }else{
            console.log("Custmer's details Table created successfully");
        }
    }
);

// watches table
ecomdb.query(
    "CREATE TABLE IF NOT EXISTS watchProduct(p_id INT AUTO_INCREMENT PRIMARY KEY, p_name VARCHAR(20) NOT NULL, p_price INT NOT NULL, p_discription VARCHAR(50) )",
    (err)=>{
        if(err){
            console.log("failed to create the table");
        }else{
            console.log("Watch product Table created successfully");
        }
    }
);

//Register rout
app.post('/register',async (req,res)=>{

    try{
        const {username, password, email, mobile_No, address} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        ecomdb.query(
            "INSERT INTO custmerDetail (username, password, email, mobile_No, address) VALUES(?, ?, ?, ?, ?)",
            [username, hashedPassword, email, mobile_No, address],

            (err)=>{
                if(err){
                    console.log('Error in Registration',err);
                    res.status(500).send('Internal Server error');
                }else{
                    res.status(201).send('Registration Succefull');
                }
            }
        )
    }catch (error){
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Login rout
app.post('/login',async (req,res)=>{
    try{
        const {username , password} = req.body;

        // Retreving the data from MySQL DB
        ecomdb.query(
            "SELECT * FROM custmerDetail WHERE username=?",
            [username],

            async(err,results)=>{
                if(err){
                    console.log('Error to retrieving User',err);
                   return res.status(500).json('Internal server error')
                }else if(results.length > 0){
                    const customer = results[0];

                    if(await bcrypt.compare(password, customer.password)){
                        const token = jwt.sign({username},"your-secrete-key");
                        res.status(200).json({token,message : 'Login Successfully'});
                    }else{
                        res.status(401).json('Invalid credentials')
                    }
                }else{
                    res.status(401).json('Invalid credentials');
                }
            }
        );
    }catch(error){
        res.status(500).json({ error: "Internal Server Error" });

    }
});

app.get('/',(req,res)=>{
    console.log('this is get API');
});



app.put('/',(req,res)=>{
    console.log('this is an update API');
});

app.delete('/',(req,res)=>{
    console.log('this is delete API');
});

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});