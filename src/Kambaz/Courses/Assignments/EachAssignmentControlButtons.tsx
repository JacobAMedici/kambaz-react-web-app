import {IoEllipsisVertical} from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import {useSelector} from "react-redux";
import {FaPencil} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {useState} from "react";
import DeleteConfirm from "./DeleteConfirm.tsx";
import {Button} from "react-bootstrap";

export default function EachAssignmentControlButtons({assignmentId}: { assignmentId: string; }) {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {cid} = useParams();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <div className="float-end">
            {currentUser.role === "FACULTY" ? (
                <>
                    <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`}>
                        <FaPencil className="text-primary me-3"/>
                    </Link>
                    <Button variant="link" onClick={handleShow} className="p-0 m-0 border-0">
                        <FaTrash className="text-danger me-3" />
                    </Button>
                </>
            ) : null}
            <GreenCheckmark/>
            <IoEllipsisVertical className="fs-4"/>
            <DeleteConfirm show={show} handleClose={handleClose} dialogTitle="Delete Assignment" assignmentId={assignmentId}/>
        </div>);
}