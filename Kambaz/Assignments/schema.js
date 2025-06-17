import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
        _id: String,
        title: String,
        course: String,
        notAvailableUntil: String,
        due: String,
        notAvailableAfter: String,
        points: Number,
        description: String,
        assignTo: String,
        assignmentGroupAs: String,
        displayGradeAs: String,
        submissionType: String
    },
    {collection: "assignments"}
);
export default assignmentSchema;
