import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Grades from "./Grades";
import { Navigate, Route, Routes } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor.tsx";
import People from "./People";
import Piazza from "./Piazza";
import Quizzes from "./Quizzes";
import Zoom from "./Zoom";
export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 1234</h2>
            <hr />
            <table>
                <tr>
                    <td valign="top">
                        <CourseNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                            <Route path="Grades" element={<Grades />} />
                            <Route path="People" element={<People />} />
                            <Route path="Piazza" element={<Piazza />} />
                            <Route path="Quizzes" element={<Quizzes />} />
                            <Route path="Zoom" element={<Zoom />} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}
