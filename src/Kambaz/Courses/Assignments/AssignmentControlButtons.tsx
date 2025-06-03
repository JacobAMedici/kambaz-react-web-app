import {IoEllipsisVertical} from "react-icons/io5";
import {FaPlus} from "react-icons/fa6";
import "../../styles.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useParams} from "react-router";

export default function AssignmentControlButtons() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {cid} = useParams();
    return (
        <div className="d-flex align-items-center gap-2 me-3">
            <div className="wd-pill">
                40% of Total
            </div>
            {currentUser.role === "FACULTY" ? (
                <>
                    <Link to={`/Kambaz/Courses/${cid}/Assignments/new`}>
                        <FaPlus style={{ color: "black" }} />
                    </Link>
                </>
            ) : null}
            <IoEllipsisVertical className="fs-4"/>
        </div>
    );
}