import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignments/dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:courseId", (req, res) => {
        const {courseId} = req.params;
        const status = dao.deleteCourse(courseId);
        res.send(status);
    });
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const {courseId} = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const {courseId} = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });
    app.put("/api/courses/:courseId", (req, res) => {
        const {courseId} = req.params;
        const courseUpdates = req.body;
        const status = dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });
    app.delete("/api/courses/:courseId", (req, res) => {
        const {courseId} = req.params;
        dao.deleteCourse(courseId);
    });

    // Create assignment
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        console.log("Here2")
        const { courseId } = req.params;
        const assignment = req.body;
        const status = assignmentDao.createAssignment(courseId, assignment);
        res.send(status);
    });
    // Retrieve Assignments
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const {courseId} = req.params;
        const status = assignmentDao.findAllAssignments(courseId);
        res.send(status);
    });
    // Update Assignment
    app.put("/api/courses/:courseId/assignments/:aid", (req, res) => {
        console.log("here")
        const {courseId, aid} = req.params;
        const updatedAssignment = req.body;
        const status = assignmentDao.updateAssignment(courseId, updatedAssignment, aid);
        res.send(status);
    });
    // Delete Assignment
    app.delete("/api/courses/:courseId/assignments/:aid", (req, res) => {
        const {courseId, aid} = req.params;
        const status = assignmentDao.deleteAssignment(courseId, aid);
        res.send(status);
    });
}
