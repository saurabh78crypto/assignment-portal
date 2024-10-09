import mongoose from 'mongoose';

const assignmentSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    task: { 
        type: String, 
        required: true 
    },
    adminId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true 
    },
    status: { 
        type: String, 
        default: 'pending' 
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
