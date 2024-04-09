const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

//registration
const register = asyncHandler(async(req, res, next) =>{
    
        const { username, email, password } = req.body;
        // validate
        if(!username || !email || !password){
            res.status(400);
            throw new Error('Please!!! All fields are required');

        }
        //check the email is taken
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400)
            throw new Error('User already exists')
        }
        //hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });
        //add the date the trail the end
        newUser.trailExpires = new Date(
            new Date().getTime() + newUser.trailPeriod * 24 * 60* 60 * 1000
        );
        //save the user
        await newUser.save();
        res.json({
            status: true,
            message: "Registration was successfull",
            user:{
               username, email 
            }, 
        });
});
//login
const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    // check for user email
    const user = await User.findOne({email});
    if(!user){
        res.status(401)
        throw new Error('Invalid email or password')
    }
    //check if password is valid
    const isMatch = await bcrypt.compare(password, user?.password)
    if(!isMatch){
        res.status(401)
        throw new Error('Invalid email or password')
    }
    //generate token(jwt)
    const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET,{
        expiresIn: '3d' //token expires in 3 days
    })
    console.log(token);
    //set the token into cookies (http only)
    res.cookie('token', token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 *1000 //1day
    });


    //send the response
    res.json({
        status:'Success',
        _id: user?._id,
        message: 'Login Success',
        username: user?.username,
        email: user?.email,
    })
})

//logout
const logout = asyncHandler(async(req, res) => {
    res.cookie('token', '',{maxAge: 1})
    res.status(200).json({message:'Logged out successfully'})
});
 
//profile
const userProfile =asyncHandler(async(req, res)=>{
    console.log(req.user);
    const id = '660fba374a4c3eeb1e628bd9';
    const user =await User.findById(id).select('-password')
    if(user){
        res.status(200).json({
            status: "success",
            user,
        })
    }else{
        res.status(404)
        throw new Error('User not found');

    }
})
//check user auth status



module.exports={
    register,
    login,
    logout,
    userProfile,
};