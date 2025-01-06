import mongoose from 'mongoose';

const PendingInviteSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.PendingInvite || mongoose.model('PendingInvite', PendingInviteSchema);