import {BsGripVertical, BsSearch} from "react-icons/bs";
import {ListGroup} from "react-bootstrap";
import {MdAssignment} from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons.tsx";
import {GoTriangleDown} from "react-icons/go";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import EachAssignmentControlButtons from "./EachAssignmentControlButtons.tsx";
import * as coursesClient from "../client.ts";
import {useEffect} from "react";
import {setAssignments} from "./reducer.ts";

export default function Assignments() {
    const {cid} = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();

    const fetchAssignments = async () => {
        const modules = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(modules));
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div id="wd-assignments">
            <div className="d-flex align-items-center">
                <div className="search-container me-3">
                    <BsSearch className="search-icon"/>
                    <input
                        type="text"
                        className="wd-search-icon-box"
                        placeholder="Search..."
                    />
                </div>
                {/*<button className="btn btn-outline-secondary me-1">+ Group</button>*/}
                {/*<button className="btn btn-danger">+ Assignment</button>*/}
            </div>
            <br/>

            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title d-flex align-items-center p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-1 fs-3"/> <GoTriangleDown/> ASSIGNMENTS
                    {/*I used ChatGPT to figure out how I should align these to the right with ms-auto*/}
                    <div className="ms-auto">
                        <AssignmentControlButtons/>
                    </div>
                </div>
                <ListGroup className="wd-lessons rounded-0">
                    {assignments
                        .filter((assignment: any) => assignment.course === cid)
                        .map((assignments : any) => {
                            const renderAssignmentDetails = () => (
                                <>
                                    {assignments.title}
                                    <div className="text-muted small">
                                        <span className="text-danger fw-semibold">Multiple Modules</span>
                                        <span className="mx-1">|</span>
                                        <span className="fw-semibold"> Not available until </span>
                                        {new Date(assignments.notAvailableUntil).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                            timeZone: "UTC",
                                        })}
                                        <br />
                                        <span className="fw-semibold"> Due </span>
                                        {new Date(assignments.due).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                            timeZone: "UTC",
                                        })}
                                        <span className="mx-1">|</span>
                                        {assignments.points} pts
                                    </div>
                                </>
                            );

                            return (
                                <ListGroup.Item key={assignments._id} className="wd-lesson p-3 ps-1">
                                    {/*I asked ChatGpt how to center align the icons here*/}
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center me-3">
                                            <BsGripVertical className="me-2 fs-3" />
                                            <MdAssignment className="me-2 fs-3" color="green" />
                                            <div>
                                                {currentUser.role === "FACULTY" ? (
                                                    <a
                                                        href={`#/Kambaz/Courses/${cid}/Assignments/${assignments._id}`}
                                                        className="text-dark text-decoration-none"
                                                    >
                                                        {renderAssignmentDetails()}
                                                    </a>
                                                ) : (
                                                    renderAssignmentDetails()
                                                )}
                                            </div>
                                        </div>
                                        <EachAssignmentControlButtons assignmentId={assignments._id}/>
                                    </div>
                                </ListGroup.Item>
                            );
                        })}
                </ListGroup>
            </ListGroup.Item>
        </div>
    );


    /*            I searched using ChatGPT to find how to use gap-2
<div className="d-flex align-items-center">
    <div className="search-container me-3">
        <BsSearch className="search-icon"/>
        <input
            type="text"
            className="wd-search-icon-box"
            placeholder="Search..."
        />
    </div>
    <button className="btn btn-outline-secondary me-1">+ Group</button>
    <button className="btn btn-danger">+ Assignment</button>
</div>
<br/>

<ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
    <div className="wd-title d-flex align-items-center p-3 ps-2 bg-secondary">
        <BsGripVertical className="me-1 fs-3"/> <GoTriangleDown/> ASSIGNMENTS
        I used ChatGPT to figure out how I should align these to the right with ms-auto
        <div className="ms-auto">
            <AssignmentControlButtons/>
        </div>
    </div>
    <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-lesson p-3 ps-1">
            I asked ChatGpt how to center align the icons here
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center me-3">
                    <BsGripVertical className="me-2 fs-3"/>
                    <MdAssignment className="me-2 fs-3" color="green"/>
                    <div>
                        <a
                            href="#/Kambaz/Courses/1234/Assignments/123"
                            className="text-dark text-decoration-none"
                        >
                            A1 - ENV + HTML
                            <div className="text-muted small">
                                I was going to use div instead of span here, but it wasn't working, so I asked ChatGPT and it said to use Span so I don't create the new line
                                <span
                                    className="text-danger fw-semibold">Multiple Modules</span>
                                <span className="mx-1">|</span>
                                <span
                                    className="fw-semibold"> Not available until </span>May
                                20 at 12:00am
                                <br/>
                                <span className="fw-semibold"> Due </span> May 27 at
                                11:59pm
                                <span className="mx-1">|</span>
                                100 pts
                            </div>
                        </a>
                    </div>
                </div>
                <LessonControlButtons/>
            </div>
        </ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
            I asked ChatGpt how to center align the icons here
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3"/>
                    <MdAssignment className="me-2 fs-3" color="green"/>
                    <div>
                        <a
                            href="#/Kambaz/Courses/1234/Assignments/123"
                            className="text-dark text-decoration-none"
                        >
                            A2 - CSS + BOOTSTRAP
                            <div className="text-muted small">
                                            <span
                                                className="text-danger fw-semibold">Multiple Modules</span>
                                <span className="mx-1">|</span>
                                <span
                                    className="fw-semibold"> Not available until </span>May
                                27 at 12:00am
                                <br/>
                                <span className="fw-semibold"> Due </span> May 30 at
                                11:59pm
                                <span className="mx-1">|</span>
                                100 pts
                            </div>
                        </a>
                    </div>
                </div>
                <LessonControlButtons/>
            </div>
        </ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
             I asked ChatGpt how to center align the icons here *
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3"/>
                    <MdAssignment className="me-2 fs-3" color="green"/>
                    <div>
                        <a
                            href="#/Kambaz/Courses/1234/Assignments/123"
                            className="text-dark text-decoration-none"
                        >
                            A3 - JAVASCRIPT + REACT
                            <div className="text-muted small">
                                            <span
                                                className="text-danger fw-semibold">Multiple Modules</span>
                                <span className="mx-1">|</span>
                                <span className="fw-semibold"> Not available until </span>
                                June 1 at 12:00am
                                <br/>
                                <span className="fw-semibold"> Due </span> June 7 at
                                11:59pm
                                <span className="mx-1">|</span>
                                100 pts
                            </div>
                        </a>
                    </div>
                </div>
                <LessonControlButtons/>
            </div>
        </ListGroup.Item>
    </ListGroup>
</ListGroup.Item>*/
}
