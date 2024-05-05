import mongoose from "mongoose";

const SongSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            
        },
        image: {
            type: String,
            required: true,
            
        },

        video: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Song = mongoose.model('Song', SongSchema);

export default Song;
