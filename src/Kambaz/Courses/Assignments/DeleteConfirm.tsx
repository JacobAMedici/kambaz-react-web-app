import {Button, Modal} from "react-bootstrap";
import { useDispatch } from "react-redux";
import {deleteAssignment} from "./reducer.ts";
import * as coursesClient from "../client.ts";
import { useParams } from "react-router-dom";

export default function DeleteConfirm({
                                         show,
                                         handleClose,
                                         dialogTitle,
                                          assignmentId,
                                     }: {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    assignmentId: string;
}) {
    const dispatch = useDispatch();
    const { cid } = useParams();

    const deleteAssignmentAsync = async () => {
        await coursesClient.deleteAssignmentForCourse(cid as string, assignmentId as string);
        dispatch(deleteAssignment(assignmentId));
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                <Button variant="primary"
                        onClick={() => {
                            deleteAssignmentAsync();
                            handleClose();
                        }}> Delete Assignment </Button>
            </Modal.Footer>
        </Modal>
    );
}
