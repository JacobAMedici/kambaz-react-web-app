import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Grades from "./Grades";
import {Navigate, Route, Routes} from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor.tsx";
import People from "./People";
import Piazza from "./Piazza";
import Quizzes from "./Quizzes";
import Zoom from "./Zoom";
import {FaAlignJustify} from "react-icons/fa";
import PeopleTable from "./People/Table.tsx";

export default function Courses() {
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                Course 1234 </h2>
            <hr/>
            <hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation/>
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="Home"/>}/>
                    <Route path="Home" element={<Home/>}/>
                    <Route path="Modules" element={<Modules/>}/>
                    <Route path="Assignments" element={<Assignments/>}/>
                    <Route path="Assignments/:aid" element={<AssignmentEditor/>}/>
                    <Route path="Grades" element={<Grades/>}/>
                    <Route path="People" element={<People/>}/>
                    <Route path="Piazza" element={<Piazza/>}/>
                    <Route path="Quizzes" element={<Quizzes/>}/>
                    <Route path="Zoom" element={<Zoom/>}/>
                    <Route path="People" element={<PeopleTable />} />
                </Routes>
            </div>
        </div>
    );
}
