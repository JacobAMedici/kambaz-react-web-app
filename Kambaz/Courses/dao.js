import Database from "../Database/index.js";
import model from "./model.js";
import {v4 as uuidv4} from "uuid";

export function findAllCourses() {
    return model.find();
}

export async function findCoursesForEnrolledUser(userId) {
    const {enrollments} = Database;
    const courses = await findAllCourses();
    return courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
}

export function createCourse(course) {
    const newCourse = {...course, _id: uuidv4()};
    return model.create(newCourse);
}

export function deleteCourse(courseId) {
    const {enrollments} = Database;
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment.course !== courseId
    );
    return model.deleteOne({_id: courseId});
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}