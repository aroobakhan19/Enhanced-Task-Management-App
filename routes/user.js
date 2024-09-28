const router = require("express").Router();
const bcrypt = require ("bcryptjs")
const User = require("../models/user");
const jwt =  require("jsowebtoken")
router.post("/sign-in",async(req,res)=>{
    try {
        const { username } =req.body;
    const {email} = req.body;

    const existingUser= await User.findOne({username: username });
    const existingEmail= await User.findOne({email : email});
    if(existingUser){
        return res.status(400).json({ message: "username already exist"});
    }else if (username.length < 4){
        return res.status(400).json({ message: "username atleast have 4 characters"});
    };
    if(existingEmail){
        return res.status(400).json({ message: "email already exist"});
    }
    const hashPassword = await bcrypt.hash(req.body.password,10)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    await newUser.save();
    return res.status(200).json({ message: "sign in successfully"}) 

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "internal error"});
    }
});
Router.get("/login", async(req,res)=>{
    const { username } =req.body;
    const existingUser= await User.findOne({username: username });
    if(existingUser){
        return res.status(400).json({ message:"username already exist"});
    }
    bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
            const authclaims =[{name: username}, { jti : jwt.sign({},"tcmTM")}]
            const token= jwt.sign({authclaims},"tcmTM",{expiresin : "2d"})
            res.status(200).json({id: existingUser._id,token: token})
        }else{
            return res.status(400).json({message: "invalid credentials"})
        }
    })
})
module.exports= router