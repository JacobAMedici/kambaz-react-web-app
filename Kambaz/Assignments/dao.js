import model from "./model.js";
import {v4 as uuidv4} from "uuid";

export function createAssignment(courseId, assignment) {
    const newAssignment = {
        ...assignment,
        course: courseId,
        id: uuidv4(),
    };
    return model.create(newAssignment);
}

export async function findAllAssignments(courseId) {
    return model.find({course: courseId});
}

// I wasn't sure what the best way to implement this one was, so I got some help from chat for the
// findOneAndUpdate
export async function updateAssignment(courseId, updatedAssignment, aid) {
    return model.findOneAndUpdate(
        {_id: aid, course: courseId},
        {$set: updatedAssignment},
        {new: true}
    );
}

// Same with this one, generated in part with ChatGPT
export async function deleteAssignment(courseId, aid) {
    const result = await model.deleteOne({_id: aid, course: courseId});

    if (result.deletedCount === 1) {
        return {status: "success", message: "Assignment deleted successfully"};
    } else {
        return {status: "error", message: "Assignment not found"};
    }
}

