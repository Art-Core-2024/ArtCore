import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    artworkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artworks',
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
        enum: ['Pending', 'Processing', 'Delivered'],
        default: 'Pending', // Default to Pending
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Orders || mongoose.model('Orders', OrderSchema);

export default Order;