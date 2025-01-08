import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    artworkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Orders || mongoose.model('Orders', OrderSchema);

export default Order;