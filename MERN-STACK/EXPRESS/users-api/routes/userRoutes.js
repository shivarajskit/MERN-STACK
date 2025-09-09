const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create user

router.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// Get user by ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// Update user by ID
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!user)return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// Delete user by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user)return res.status(404).json({message: 'User not found'});
        res.json({message: 'User deleted'});
    } catch (error) {
        next(error);
    }
});




module.exports = router;