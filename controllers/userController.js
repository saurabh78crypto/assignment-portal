import User from '../models/userModel.js';
import Assignment from '../models/assignmentModel.js';
import Admin from '../models/adminModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// User registration
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
});

// User login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.json({ token });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Upload assignment
const uploadAssignment = asyncHandler(async (req, res) => {
    const { task, adminId } = req.body;
    const userId = req.user._id;

    const assignment = await Assignment.create({
        userId,
        task,
        adminId,
    });

    res.status(201).json(assignment);
});

// Fetch all admins
const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await Admin.find({});
    res.json(admins);
})

export { registerUser, loginUser, uploadAssignment, getAllAdmins };
