const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}))


///database
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://aniket1:hianiket123@cluster0.z69mafx.mongodb.net/?retryWrites=true&w=majority');
}

const profileSchema = new mongoose.Schema({
    username: String,
    password: String
  });
const Profile = mongoose.model('Profile', profileSchema);



app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})


app.post("/", (req, res)=>{
    btnNumber = req.body.butt;
    if(btnNumber == 1){
        res.sendFile(__dirname + "/login.html");
    }
    if(btnNumber == 2){
        res.sendFile(__dirname + "/signup.html");
    }
})

app.post("/signup.html", (req,res)=>{
    personUsername = req.body.username;
    personPassword = req.body.password;
    //checking if already signed in
    Profile.find((err, profiles)=>{
        if(err){
            console.log(err);
        }
        else{
            check = false
            profiles.forEach((profile)=>{
                    if(profile.username === personUsername){
                        check = true
                    }
                })
            }
            if(check === false){
                const arr = [{ username: personUsername, password: personPassword }];
                Profile.insertMany(arr, function(error, docs) {
                        if(error){
                            console.log(error);
                        }
                        else{
                            console.log("successfully inserted");
                        }
                })
                res.send(`<h1>Your account has been created. Now login</h1>`)
            }
            if(check === true){
                res.send(`<h1>username already exist</h1>`);
            }
        }
        );    
})

app.post("/login.html",(req,res)=>{
    personUsername = req.body.username;
    personPassword = req.body.password;
    //checking if already signed in
    Profile.find((err, profiles)=>{
        if(err){
            console.log(err);
        }
        else{
            usernameCheck = false;
            passwordCheck = false;
            profiles.forEach((profile)=>{
                    if(profile.username === personUsername){
                        usernameCheck = true
                        if(profile.password === personPassword){
                            passwordCheck = true
                        }
                    }
                })
            }
            if(usernameCheck === false){
                res.send(`<h1>no accounnt found with this username</h1>`)
            }
            if(usernameCheck === true && passwordCheck === false){
                res.send(`<h1>wrong password try again</h1>`);
            }
            if(usernameCheck === true && passwordCheck === true){
                res.send(`<h1>Logged in successfully</h1>`)
            }
        }
        );    
})



app.listen(3000, ()=>{
    console.log("port started on 3000");
})

