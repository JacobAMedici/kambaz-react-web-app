import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {useParams} from "react-router";
export function ProtectedRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser) {
        return children;
    } else {
        return <Navigate to="/Kambaz/Account/Signin" />;
    }}

export function CourseProtectedRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.coursesReducer);
    const { cid } = useParams();

    if (enrollments.some(
        (enrollment: any) =>
            enrollment.user === currentUser._id &&
            enrollment.course === cid
    )) {
        return children;
    } else {
        return <Navigate to="/Kambaz/Dashboard" />;
    }
}