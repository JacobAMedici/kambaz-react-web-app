import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:courseId", async (req, res) => {
        const {courseId} = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    });
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const {courseId} = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const {courseId} = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });
    app.put("/api/courses/:courseId", async (req, res) => {
        const {courseId} = req.params;
        const courseUpdates = req.body;
        const updatedCourse = await dao.updateCourse(courseId, courseUpdates);
        res.send(updatedCourse);
    });
    app.delete("/api/courses/:courseId", async (req, res) => {
        const {courseId} = req.params;
        await dao.deleteCourse(courseId);
    });

    // Create assignment
    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        console.log("Here2")
        const {courseId} = req.params;
        const assignment = req.body;
        const status = await assignmentDao.createAssignment(courseId, assignment);
        res.send(status);
    });
    // Retrieve Assignments
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const {courseId} = req.params;
        const status = await assignmentDao.findAllAssignments(courseId);
        res.send(status);
    });
    // Update Assignment
    app.put("/api/courses/:courseId/assignments/:aid", async (req, res) => {
        console.log("here")
        const {courseId, aid} = req.params;
        const updatedAssignment = req.body;
        const status = await assignmentDao.updateAssignment(courseId, updatedAssignment, aid);
        res.send(status);
    });
    // Delete Assignment
    app.delete("/api/courses/:courseId/assignments/:aid", async (req, res) => {
        const {courseId, aid} = req.params;
        const status = await assignmentDao.deleteAssignment(courseId, aid);
        res.send(status);
    });

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    };
    app.get("/api/courses/:cid/users", findUsersForCourse);
}
