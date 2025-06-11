import Database from "../Database/index.js";

// TODO: Add CRUD Here
export function createAssignment(courseId, assignment) {
    const newAssignment = {
        ...assignment,
        course: courseId,
        id: Database.assignments.length + 1, // Simple ID generation
    };
    Database.assignments.push(newAssignment);
    return newAssignment;
}

export function findAllAssignments(courseId) {
    return Database.assignments.filter(assignment => assignment.course === courseId);
}

export function updateAssignment(courseId, updatedAssignment, aid) {
    const assignmentIndex = Database.assignments.findIndex(
        (assignment) =>
            assignment._id === aid && assignment.course === courseId
    );

    if (assignmentIndex !== -1) {
        Database.assignments[assignmentIndex] = {
            ...Database.assignments[assignmentIndex],
            ...updatedAssignment,
        };
        return Database.assignments[assignmentIndex];
    }

    return null;
}

// This function was generated with Github Copilot
export function deleteAssignment(courseId, aid) {
    const assignmentIndex = Database.assignments.findIndex(
        (assignment) =>
            assignment._id === aid && assignment.course === courseId
    );

    if (assignmentIndex !== -1) {
        Database.assignments.splice(assignmentIndex, 1);
        return { status: "success", message: "Assignment deleted successfully" };
    }

    return { status: "error", message: "Assignment not found" };
}
