
import mongoose from 'mongoose';


const StudentSchema = new mongoose.Schema({
    country: {
        type: String,
    },
    almaMater: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    age : {
        type: Number
    }
});


export const Student = mongoose.model("Student", StudentSchema);
