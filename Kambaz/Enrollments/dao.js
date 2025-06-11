import Database from "../Database/index.js";
import {v4 as uuidv4} from "uuid";

export function enrollUserInCourse(userId, courseId) {
    const {enrollments} = Database;
    enrollments.push({_id: uuidv4(), user: userId, course: courseId});
}

export function enroll(userId, courseId) {
    const newEnrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
    };
    Database.enrollments.push(newEnrollment);
    return newEnrollment;
}

export function unenroll(userId, courseId) {
    Database.enrollments = Database.enrollments.filter(
        (enrollment) =>
            !(enrollment.user === userId && enrollment.course === courseId)
    );
    return { status: "OK" };
}

