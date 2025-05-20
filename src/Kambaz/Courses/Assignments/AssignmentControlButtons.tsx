import {IoEllipsisVertical} from "react-icons/io5";
import {FaPlus} from "react-icons/fa6";
import "../../styles.css";

export default function AssignmentControlButtons() {
    return (
        <div className="d-flex align-items-center gap-2 me-3">
            <div className="wd-pill">
                40% of Total
            </div>
            <FaPlus/>
            <IoEllipsisVertical className="fs-4"/>
        </div>
    );
}