const express = require("express");
const app = express();
const cors=require("cors");
const mongoose = require("mongoose");
const ExcelModel = require("./models/Excel");
const User = require("./models/Loginschema")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

/// DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/ExcelDb?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true}
);


/*mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})*/


app.post("/insert", async (req, res) => {
  //app.use(bodyParser.urlencoded({extended:false}));
  const fileData=req.body.data; 
  console.log("backend",fileData);
 // fileData=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
  try {
    //const Excel=new ExcelModel({fileData:fileData});
  ExcelModel.insertMany(fileData,(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})
  
  res.send("Inserted DATA");
  } catch (error) {
    res.send(error);
  }

  
});

app.post("/Login", (req, res)=> {
  const { email, password} = req.body
  User.findOne({ email: email}, (err, user) => {
      if(user){
          if(password === user.password ) {
              res.send({message: "Login Successfull", user: user})
          } else {
              res.send({ message: "Password didn't match"})
          }
      } else {
          res.send({message: "User not registered"})
      }
  })
}) 

app.post("/Register",(req, res)=> {
  const { name, email, password} = req.body;
  //const password = await bcrypt.hash(plainTextPassword,salt);
  User.findOne({email: email}, (err, user) => {
      if(user){
          res.send({message: "User already registerd"})
      } else {
          const user = new User({
              name,
              email,
              password
          })
          
          user.save(err => {
              if(err) {
                  res.send(err)
              } else {
                  res.send( { message: "Successfully Registered, Please login now." })
              }
          })
      }
  })
  
}) 



app.listen(3001, () => {
  console.log("You are connected!");
});