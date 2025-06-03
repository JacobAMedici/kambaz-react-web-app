import {Col, Form, Row} from "react-bootstrap";
import {useParams, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAssignment, updateAssignment} from "./reducer";
import {useEffect, useState} from "react";

export default function AssignmentEditor() {
    const {aid, cid} = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const assignment = assignments.find((a: any) => a._id === aid);
    const dispatch = useDispatch();

    // I did not know what the optimal way to extract some of the code out for updating vs adding
    // as assignment, so I took what I had and had ChatGPT help me create the handleSave and
    // useEffect functions.
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0);
    const [assignmentGroupAs, setAssignmentGroupAs] = useState("ASSIGNMENTS");
    const [displayGradeAs, setDisplayGradeAs] = useState("PERCENTAGE");
    const [submissionType, setSubmissionType] = useState("ONLINE");
    const [assignTo, setAssignTo] = useState("");
    const [due, setDue] = useState("");
    const [notAvailableUntil, setNotAvailableUntil] = useState("");
    const [notAvailableAfter, setNotAvailableAfter] = useState("");

    useEffect(() => {
        if (assignment) {
            setTitle(assignment.title || "");
            setDescription(assignment.description || "");
            setPoints(assignment.points || 0);
            setAssignmentGroupAs(assignment.assignmentGroupAs || "ASSIGNMENTS");
            setDisplayGradeAs(assignment.displayGradeAs || "PERCENTAGE");
            setSubmissionType(assignment.submissionType || "ONLINE");
            setAssignTo(assignment.assignTo || "");
            setDue(assignment.due ? new Date(assignment.due).toISOString().slice(0, 10) : "");
            setNotAvailableUntil(assignment.notAvailableUntil ? new Date(assignment.notAvailableUntil).toISOString().slice(0, 10) : "");
            setNotAvailableAfter(assignment.notAvailableAfter ? new Date(assignment.notAvailableAfter).toISOString().slice(0, 10) : "");
        }
    }, [assignment]);

    const handleSave = () => {
        const maxId = assignments.reduce((max: number, a: any) => {
            const idNum = parseInt(a._id, 10);
            return isNaN(idNum) ? max : Math.max(max, idNum);
        }, 0);

        const newAssignment = {
            _id: aid === "new" ? (maxId + 1).toString() : aid,
            course: cid,
            title,
            description,
            points,
            assignmentGroupAs,
            displayGradeAs,
            submissionType,
            assignTo,
            due,
            notAvailableUntil,
            notAvailableAfter,
        };

        if (aid === "new") {
            dispatch(addAssignment(newAssignment));
        } else {
            dispatch(updateAssignment(newAssignment));
        }
    };

    return (
        <div id="wd-assignments-editor">
            <Col>
                <Form>
                    <Form.Group as={Row} className="mb-3 small" controlId="wd-name">
                        <Form.Label column sm={12} className="text-start" style={{width: 200}}>
                            Assignment Name
                        </Form.Label>
                        <Row sm={12}>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Assignment Name" />
                        </Row>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 small" controlId="wd-description">
                        <Col sm={12}>
                            <Form.Control as="textarea" style={{height: "100px"}} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Assignment Description" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 small" controlId="wd-points">
                        <Form.Label column sm={4} className="text-end">Points</Form.Label>
                        <Col sm={8}>
                            <Form.Control type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} placeholder="0" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 small" controlId="wd-group">
                        <Form.Label column sm={4} className="text-end">Assignment Group</Form.Label>
                        <Col sm={8}>
                            <Form.Select value={assignmentGroupAs} onChange={(e) => setAssignmentGroupAs(e.target.value)}>
                                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                <option value="QUIZZES">QUIZZES</option>
                                <option value="EXAMS">EXAMS</option>
                                <option value="PROJECT">PROJECT</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 small" controlId="wd-display-grade-as">
                        <Form.Label column sm={4} className="text-end">Display Grade as</Form.Label>
                        <Col sm={8}>
                            <Form.Select value={displayGradeAs} onChange={(e) => setDisplayGradeAs(e.target.value)}>
                                <option value="PERCENTAGE">Percentage</option>
                                <option value="LETTER">Letter</option>
                                <option value="HIDDEN">Hidden</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 small" controlId="wd-submission-type">
                        <Form.Label column sm={4} className="text-end">Submission Type</Form.Label>
                        <Col sm={8}>
                            <div className="border rounded p-3">
                                <Form.Select value={submissionType} onChange={(e) => setSubmissionType(e.target.value)}>
                                    <option value="ONLINE">Online</option>
                                    <option value="PAPER">Paper</option>
                                    <option value="NONE">None</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 small" controlId="wd-assign">
                        <Form.Label column sm={4} className="text-end">Assign</Form.Label>
                        <Col sm={8}>
                            <div className="border rounded p-3">
                                <Row>
                                    <Form.Label><div className="fw-semibold mb-0">Assign to</div></Form.Label>
                                    <Form.Control value={assignTo} onChange={(e) => setAssignTo(e.target.value)} />
                                </Row>
                                <Row>
                                    <Form.Label><div className="fw-semibold mb-0">Due</div></Form.Label>
                                    <Form.Control type="date" value={due} onChange={(e) => setDue(e.target.value)} />
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Label><div className="fw-semibold mb-0">Available from</div></Form.Label>
                                        <Form.Control type="date" value={notAvailableUntil} onChange={(e) => setNotAvailableUntil(e.target.value)} />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Label><div className="fw-semibold mb-0">Until</div></Form.Label>
                                        <Form.Control type="date" value={notAvailableAfter} onChange={(e) => setNotAvailableAfter(e.target.value)} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            </Col>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <button className="btn btn-outline-secondary">Cancel</button>
                    <button className="btn btn-danger" onClick={handleSave}>Save</button>
                </Link>
            </div>
        </div>
    );
}
