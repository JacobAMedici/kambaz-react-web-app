import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, FormControl, Row} from "react-bootstrap";
import {
    addCourseAsync,
    deleteCourseAsync,
    enrollAsync, loadInitialState,
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

    const [course, setCourse] = useState({name: "New Course", description: "New Description", });
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const {courses} = useSelector((state: any) => state.coursesReducer);

    // I was having issues with checking if the class actually exists in enrollments, so I used
    // ChatGPT to help me create this function
    const findCoursesForUser = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);

            if (enrolledCourses.length === 0) {
                dispatch(setCourses([]));
                return;
            } else {
                const validCourseIds = new Set(allCourses.map((c: any) => c._id));
                const validEnrollments = (enrolledCourses || [])
                    .filter((c: any) => c && validCourseIds.has(c._id));

                dispatch(setCourses(validEnrollments));
            }
        } catch (error) {
            console.error(error);
        }
    };


    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id) || [];

            const validCourseIds = new Set(allCourses.map((c: any) => c._id));

            const validEnrollments = enrolledCourses
                .filter((c: any) => c && validCourseIds.has(c._id));

            const courses = allCourses.map((course: any) => {
                if (validEnrollments.find((c: any) => c && c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });

            dispatch(setCourses(courses));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
       loadInitialState();
        // console.log(enrollments)
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [enrolling, currentUser]);

    const getCourseNum = () => courses.length;

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
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
                                            await dispatch(deleteCourseAsync(course._id));
                                            if (enrolling) {
                                                fetchCourses();
                                            } else {
                                                findCoursesForUser();
                                            }
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        {(course.enrolled || !enrolling) ? (
                            <button
                                className="btn btn-danger mt-2"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    await dispatch(unenrollAsync(currentUser._id, course._id));
                                    if (enrolling) {
                                        fetchCourses();
                                    } else {
                                        findCoursesForUser();
                                    }
                                }}
                            >
                                Unenroll
                            </button>
                        ) : (
                            <button
                                className="btn btn-success mt-2"
                                onClick={async (e) => {
                                    // console.log("COURSE._ID", course._id);
                                    // console.log("ENROLLED.COURSE", course.enrolled);
                                    // console.log("User_ID", currentUser._id);
                                    e.preventDefault();
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    await dispatch(enrollAsync(currentUser._id, course._id));
                                    if (enrolling) {
                                        fetchCourses();
                                    } else {
                                        findCoursesForUser();
                                    }
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
                                onClick={async () => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    await dispatch(addCourseAsync(course, currentUser._id));
                                    if (enrolling) {
                                        fetchCourses();
                                    } else {
                                        findCoursesForUser();
                                    }
                                }}>
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2"
                                onClick={async () => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    await dispatch(updateCourseAsync(course));
                                    if (enrolling) {
                                        fetchCourses();
                                    } else {
                                        findCoursesForUser();
                                    }
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
                <button className="btn btn-primary float-end" onClick={() => setEnrolling(!enrolling)}>
                    {enrolling ? "Enrolled Only" : "All Courses"}
                </button>
            </h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map(renderCourseCard)}
                </Row>
            </div>
        </div>
    );
}
