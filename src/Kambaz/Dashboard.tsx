import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                          className="wd-dashboard-course-link">
                        <img src="/images/reactjs.png" width={200}/>
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course1">
                    <Link to="/Kambaz/Courses/2345/Home"
                          className="wd-dashboard-course1-link">
                        <img src="/images/reactjs.png" width={200}/>
                        <div>
                            <h5> CS2345 WebDev </h5>
                            <p className="wd-dashboard-course1-title">
                                Full Stack web developer </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course2">
                    <Link to="/Kambaz/Courses/3456/Home"
                          className="wd-dashboard-course2-link">
                        <img src="/images/reactjs.png" width={200}/>
                        <div>
                            <h5> CS3456 SoftwareDev </h5>
                            <p className="wd-dashboard-course2-title">
                                Full Stack software developer (2) </p>
                            <button> Go</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
