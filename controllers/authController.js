const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
   try{
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })

    await newUser.save();

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.status(201).json({
        message: "User registered successfully!",
        token,
        user:{
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    })

   }
   catch(error){
    console.error("Registration Error Message: ", error.message);
    res.status(500).json({message: "Server error"});
   }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "Invalid user."})
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return res.status(400).json({message: "Invalid Password."})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.status(200).json({
        message: "Successfully logged in.",
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })
};