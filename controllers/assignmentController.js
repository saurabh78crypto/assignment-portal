import Assignment from '../models/assignmentModel.js';
import asyncHandler from 'express-async-handler';

// Upload a new assignment
const uploadAssignment = asyncHandler(async (req, res) => {
    const { task, adminId } = req.body;

    const assignment = await Assignment.create({
        task,
        adminId,
        userId: req.user._id,
        status: 'pending',
    });

    res.status(201).json(assignment);
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

export default { uploadAssignment, getAllAssignments, updateAssignmentStatus };
