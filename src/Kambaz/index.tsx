import {Navigate, Route, Routes} from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import {ProtectedRoute} from "./Account/ProtectedRoute.tsx";
import {useSelector} from "react-redux";
import Session from "./Account/Session";
import {useEffect, useState} from "react";
import * as courseClient from "./Courses/client";

export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const {currentUser} = useSelector((state: any) => state.accountReducer);

    const fetchCourses = async () => {
        try {
            const courses = await courseClient.fetchAllCourses();
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation/>
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account"/>}/>
                        <Route path="/Account/*" element={<Account/>}/>
                        <Route path="Dashboard" element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }/>
                        <Route
                            path="Courses/:cid/*" element={
                            <Courses courses={courses}/>
                        }
                        />
                        <Route path="/Calendar" element={<h1>Calendar</h1>}/>
                        <Route path="/Inbox" element={<h1>Inbox</h1>}/>
                    </Routes>
                </div>
            </div>
        </Session>

    );
}

