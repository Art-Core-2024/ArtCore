import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IArtwork extends Document {
    name: string;
    type: 'Lippan Art' | 'Wall Hanging' | 'Canvas' | 'Bookmarks' | 'Digital';
    price: number;
    description: string;
    featured: boolean;
    image: string;
}

const ArtworkSchema: Schema<IArtwork> = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true, enum: ['Lippan Art', 'Wall Hanging', 'Canvas', 'Bookmarks', 'Digital'] },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        featured: { type: Boolean, default: false },
        image: { type: String, required: true }, 
    },
    { timestamps: true }
);

const Artwork: Model<IArtwork> =
    mongoose.models.Artwork || mongoose.model<IArtwork>('Artwork', ArtworkSchema);

export default Artwork;