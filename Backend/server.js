const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"signup"
})

app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (`id`,`name`,`email`,`phone`,`password`,`date`) VALUES (?,?,?,?,?,?)";
  const values = [
    req.body.id,
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.password,
    req.body.date
  ]
  db.query(sql, values, (err, data) => { 
    if(err){
      return res.json({ Error: err});
    }
      return res.json(data);
})
})


app.post('/login', (req, res) =>{
  const sql = "SELECT * FROM login WHERE `id` = ? AND `password` = ?"
  db.query(sql, [req.body.id, req.body.password], (err, data)=> {
    if(err){
      return res.json({ Error: err})
    }
    if(data.length > 0){
      return res.json('Login Successful');
    }
    else{
      return res.json('Login Failed');
    }
  })

})

app.listen(3100, ()=>{
  console.log("Listening");
})