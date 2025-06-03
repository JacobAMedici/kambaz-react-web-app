import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, FormControl, Row} from "react-bootstrap";
import {addCourse, deleteCourse, enroll, unenroll, updateCourse} from "./Courses/courseReducer.ts";
import {useState} from "react";

export default function Dashboard() {

    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {courses, enrollments} = useSelector((state: any) => state.coursesReducer);
    const dispatch = useDispatch();
    const [course, setCourse] = useState({name: "New Course", description: "New Description"});
    const [toggled, setToggled] = useState(false);
    const handleClick = () => setToggled(!toggled);

    // I originally had this as a function, but it was causing issues with the renderContent function
    // so I had ChatGPT fix it slightly to return the cards directly, making them display as normal
    const renderContent = () => {
        const visibleCourses = toggled
            ? courses
            : courses.filter((course: any) =>
                enrollments.some(
                    (enrollment: any) =>
                        enrollment.user === currentUser._id &&
                        enrollment.course === course._id
                )
            );
        return visibleCourses.map(renderCourseCard);
    };


    const getCourseNum = () => {
        if (!toggled) {
            return (
                courses.filter((course: any) =>
                    enrollments.some(
                        (enrollment: any) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                    )).length
            );
        } else {
            return (
                courses.length
            );
        }
    };

    const isEnrolled = (courseId: string) => {
        return enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id && enrollment.course === courseId
        );
    };

    const renderCourseCard = (course: any) => (
        <Col key={course._id} className="wd-dashboard-course" style={{width: "300px"}}>
            <Card>
                <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                    <Card.Img src="/images/reactjs.png" variant="top" width="100%" height={160}/>
                    <Card.Body className="card-body">
                        <Card.Title
                            className="wd-dashboard-course-title text-nowrap overflow-hidden">
                            {course.name}
                        </Card.Title>
                        <Card.Text
                            className="wd-dashboard-course-description overflow-hidden"
                            style={{height: "100px"}}
                        >
                            {course.description}
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                            <Button variant="primary">Go</Button>
                            {currentUser.role === "FACULTY" ? (
                                <div>
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}
                                        className="btn btn-warning"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault();
                                            dispatch(deleteCourse(course._id));
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : null}
                        </div>

                        {(
                            isEnrolled(course._id) ? (
                                <button
                                    className="btn btn-danger"

                                    onClick={(event) => {
                                        event.preventDefault();
                                        dispatch(unenroll({
                                            userId: currentUser._id,
                                            cid: course._id
                                        }));
                                    }}
                                >
                                    Unenroll
                                </button>
                            ) : (
                                <button
                                    className="btn btn-success"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        dispatch(enroll({
                                            userId: currentUser._id,
                                            cid: course._id
                                        }));
                                    }}
                                >
                                    Enroll
                                </button>
                            )
                        )}

                    </Card.Body>
                </Link>
            </Card>
        </Col>
    );


    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>

            {currentUser.role === "FACULTY" ? (
                <div id={"wd-dashboard-create-course"}>
                    <h5>New Course
                        <button
                            className="btn btn-primary float-end"
                            onClick={() => dispatch(addCourse(course))}>
                            Add
                        </button>

                        <button
                            className="btn btn-warning float-end me-2"
                            onClick={() => dispatch(updateCourse(course))}>
                            Update
                        </button>

                    </h5>
                    <br/>
                    <FormControl value={course.name} className="mb-2"
                                 onChange={(e) => setCourse({...course, name: e.target.value})}/>
                    <FormControl as="textarea" value={course.description} rows={3}
                                 onChange={(e) => setCourse({
                                     ...course,
                                     description: e.target.value
                                 })}/>
                    <hr/>
                </div>
            ) : null}

            <h2 id="wd-dashboard-published">Published Courses ({getCourseNum()})
                <button
                    className="btn btn-primary float-end"
                    onClick={handleClick}>
                    Enrollments
                </button>
            </h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {renderContent()}
                </Row>
            </div>
        </div>);
}