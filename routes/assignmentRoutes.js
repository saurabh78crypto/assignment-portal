import express from 'express';
import { getAssignments, updateAssignmentStatus } from '../controllers/adminController.js';
import { uploadAssignment } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// User upload assignment
router.post('/upload', protect, uploadAssignment);

// Admin view and update assignment
router.get('/', protect, getAssignments);
router.post('/:id/accept', protect, (req, res) => updateAssignmentStatus(req, res, 'accepted'));
router.post('/:id/reject', protect, (req, res) => updateAssignmentStatus(req, res, 'rejected'));

export default router;
