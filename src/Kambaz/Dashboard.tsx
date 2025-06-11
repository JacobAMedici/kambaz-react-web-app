import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, FormControl, Row} from "react-bootstrap";
import {
    addCourseAsync,
    deleteCourseAsync,
    enrollAsync,
    setCourses,
    unenrollAsync,
    updateCourseAsync
} from "./Courses/courseReducer";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import {Link} from "react-router-dom";

export default function Dashboard() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();

    const [course, setCourse] = useState({name: "New Course", description: "New Description"});
    const [toggled, setToggled] = useState(false);
    const {courses} = useSelector((state: any) => state.coursesReducer);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

    const fetchCourses = async () => {
        try {
            const all = await courseClient.fetchAllCourses();
            const enrolled = await userClient.findMyCourses();
            dispatch(setCourses(all));
            setEnrolledCourses(enrolled);
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    const isEnrolled = (courseId: string) =>
        enrolledCourses.some((course) => course._id === courseId);

    const getVisibleCourses = () =>
        toggled ? courses : enrolledCourses;

    const getCourseNum = () => getVisibleCourses().length;

    // From here below I used ChatGPT to refactor the code because, to implement the functionality
    // of toggling between all courses and enrolled courses, I needed to simplify the rendering
    // logic. So, I had it help me there.
    const renderCourseCard = (course: any) => (
        <Col key={course._id} className="wd-dashboard-course" style={{width: "300px"}}>
            <Card>
                <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                    <Card.Img src="/images/reactjs.png" variant="top" width="100%" height={160}/>
                    <Card.Body>
                        <Card.Title
                            className="text-nowrap overflow-hidden">{course.name}</Card.Title>
                        <Card.Text className="overflow-hidden" style={{height: "100px"}}>
                            {course.description}
                        </Card.Text>

                        <div className="d-flex justify-content-between">
                            <Button variant="primary">Go</Button>
                            {currentUser.role === "FACULTY" && (
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCourse(course);
                                        }}
                                        className="btn btn-warning"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            fetchCourses();
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
                                            dispatch(deleteCourseAsync(course._id));
                                            fetchCourses();
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        {isEnrolled(course._id) ? (
                            <button
                                className="btn btn-danger mt-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchCourses();
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    dispatch(unenrollAsync(currentUser._id, course._id));
                                    fetchCourses();
                                }}
                            >
                                Unenroll
                            </button>
                        ) : (
                            <button
                                className="btn btn-success mt-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchCourses();
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    dispatch(enrollAsync(currentUser._id, course._id));
                                    fetchCourses();
                                }}
                            >
                                Enroll
                            </button>
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

            {currentUser.role === "FACULTY" && (
                <div id="wd-dashboard-create-course">
                    <h5>
                        New Course
                        <button className="btn btn-primary float-end"
                                onClick={() => {
                                    fetchCourses();
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    dispatch(addCourseAsync(course));
                                    fetchCourses();
                                }}>
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2"
                                onClick={() => {
                                    fetchCourses();
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    dispatch(updateCourseAsync(course));
                                    fetchCourses();
                                }}>
                            Update
                        </button>
                    </h5>
                    <br/>
                    <FormControl
                        value={course.name}
                        className="mb-2"
                        onChange={(e) => setCourse({...course, name: e.target.value})}
                    />
                    <FormControl
                        as="textarea"
                        value={course.description}
                        rows={3}
                        onChange={(e) => setCourse({...course, description: e.target.value})}
                    />
                    <hr/>
                </div>
            )}

            <h2 id="wd-dashboard-published">
                Published Courses ({getCourseNum()})
                <button className="btn btn-primary float-end" onClick={() => setToggled(!toggled)}>
                    {toggled ? "Enrolled Only" : "All Courses"}
                </button>
            </h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {getVisibleCourses().map(renderCourseCard)}
                </Row>
            </div>
        </div>
    );
}
