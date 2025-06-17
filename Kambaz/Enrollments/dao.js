import model from "./model.js";

export async function enroll(user, course) {
    // console.log("Enrolling in course", user, course);
    // I added this incase there was an issue and the _id was already taken
    const existing = await model.findOne({_id: `${user}-${course}`});
    if (existing) return existing;
    const newEnrollment = {user, course, _id: `${user}-${course}`};
    return model.create(newEnrollment);
    // const newEnrollment = {
    //     _id: uuidv4(),
    //     user: userId,
    //     course: courseId,
    // };
    // Database.enrollments.push(newEnrollment);
    // return newEnrollment;
}

export function unenroll(user, course) {
    // console.log("Unnrolling in course", user, course);
    return model.deleteOne({ user, course });
    // Database.enrollments = Database.enrollments.filter(
    //     (enrollment) =>
    //         !(enrollment.user === userId && enrollment.course === courseId)
    // );
    // return { status: "OK" };
}

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
    return model.create({ user, course, _id: `${user}-${course}` });
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}
