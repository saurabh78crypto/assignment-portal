import Admin from '../models/adminModel.js';
import Assignment from '../models/assignmentModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// Admin registration
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await Admin.create({ name, email, password });
    res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
    });
});

// Admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        const token = jwt.sign({ _id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.json({ token });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// View assignments tagged to admin
const getAssignments = asyncHandler(async (req, res) => {
    const adminId = req.user._id;

    const assignments = await Assignment.find({ adminId }).populate('userId', 'name');
    res.json(assignments);
});

// Accept or reject assignment
const updateAssignmentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const assignment = await Assignment.findById(id);

    if (assignment) {
        assignment.status = status;
        await assignment.save();
        res.json(assignment);
    } else {
        res.status(404);
        throw new Error('Assignment not found');
    }
});

export { registerAdmin, loginAdmin, getAssignments, updateAssignmentStatus };
