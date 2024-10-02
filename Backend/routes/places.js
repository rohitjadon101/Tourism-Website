const express = require("express");
const router = express.Router();
const place = require('../models/Place');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const dotenv = require("dotenv");

dotenv.config();

// Get all places
router.get('/', async (req,res) => {
    try {
        const places = await place.find();
        res.json(places);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get places by category
router.get('/:category', async (req,res) => {
    try {
        const places = await place.find({category: req.params.category});
        if (!places.length) return res.status(404).json({ message: 'No places found in this category' });
        res.json(places); 
    } catch (error) {
        res.status(500).json({message: 'Server error. Please try again later.'});
    }
});

// Admin Registration
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createAdmin = new Admin({
        name,
        email,
        password: hash
    });
    
    try {
        const savedAdmin = await createAdmin.save();
        res.json(savedAdmin);
    } catch (error) {
        res.json({message: error.message});
    }
})

// Admin login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const admin = await Admin.findOne({email});
        if(!admin) return res.json({message: 'Incorrect email or password'});

        bcrypt.compare(password, admin.password, (err, result) => {
            if (err) {
                return res.json({ message: "Error comparing passwords" });
            }
            if (!result) {
                return res.json({ message: 'Incorrect email or password' });
            }
            const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET);
            res.json({token});
        })
    } catch (error) {
        res.json({message: error.message});
    }
})

// Add new place
router.post('/addPlace', auth, async (req, res) => {
    const { title1, title2, img1, img2, img3, content, category } = req.body;
    
    const newPlace = new place({
        title1, title2, img1, img2, img3, content, category
    });
    
    try {
        const savedPlace = await newPlace.save();
        res.json(savedPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;