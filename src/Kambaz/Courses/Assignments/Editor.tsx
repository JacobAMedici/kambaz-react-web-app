import {Col, Form, Row} from "react-bootstrap";
import {useParams} from "react-router";
import * as db from "../../Database";
import {Link} from "react-router-dom";

export default function AssignmentEditor() {
    const {aid} = useParams();
    const assignments = db.assignments;
    const assignment = assignments.find((a: any) => a._id === aid);
    const {cid} = useParams();
    return (
        <div id="wd-assignments-editor">

            <Col>
                <Form>
                    {assignment && (
                        <Form.Group as={Row} className="mb-3 small" controlId="wd-name">
                            <Form.Label column sm={12} className="text-start" style={{width: 200}}>
                                Assignment Name
                            </Form.Label>
                            <Row sm={12}>
                                <Form.Control type="text" value={assignment.title}/>
                            </Row>
                        </Form.Group>
                    )}

                    {assignment && (
                        <Form.Group as={Row} className="mb-3 small" controlId="wd-description">
                            <Col sm={12}>
                                <Form.Control as="textarea" style={{height: "100px"}}
                                              value={assignment.description}/>
                            </Col>
                        </Form.Group>
                    )}

                    {assignment && (
                        <Form.Group as={Row} className="mb-3 small" controlId="wd-points">
                            <Form.Label column sm={4} className="text-end">
                                Points
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="number" value={assignment.points}/>
                            </Col>
                        </Form.Group>
                    )}

                    {assignment && (
                        <Form.Group as={Row} className="mb-3 small" controlId="wd-group">
                            <Form.Label column sm={4} className="text-end">
                                Assignment Group
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Select defaultValue={assignment.assignmentGroupAs}>
                                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                    <option value="QUIZZES">QUIZZES</option>
                                    <option value="EXAMS">EXAMS</option>
                                    <option value="PROJECT">PROJECT</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    )}

                    {assignment && (
                        <Form.Group as={Row} className="mb-3 small" controlId="wd-display-grade-as">
                            <Form.Label column sm={4} className="text-end">
                                Display Grade as
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Select defaultValue={assignment.displayGradeAs}>
                                    <option value="PERCENTAGE">Percentage</option>
                                    <option value="LETTER">Letter</option>
                                    <option value="HIDDEN">Hidden</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    )}

                    {assignment && (
                        <Form.Group as={Row} className="mb-3 small" controlId="wd-submission-type">
                            <Form.Label column sm={4} className="text-end">
                                Submission Type
                            </Form.Label>
                            <Col sm={8}>
                                <div className="border rounded p-3">
                                    <Form.Select defaultValue={assignment.submissionType}>
                                        <option value="ONLINE">Online</option>
                                        <option value="PAPER">Paper</option>
                                        <option value="NONE">None</option>
                                    </Form.Select>
                                    <div className="fw-semibold mb-2">Online Entry Options</div>
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-text-entry"
                                        value="TEXT_ENTRY"
                                        label="Text Entry"
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        id="wd-website-url"
                                        value="WEBSITE_URL"
                                        label="Website URL"
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        id="wd-media-recording"
                                        value="MEDIA_RECORDING"
                                        label="Media Recording"
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        id="wd-student-annotation"
                                        value="STUDENT_ANNOTATION"
                                        label="Student Annotation"
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        id="wd-file-upload"
                                        value="FILE_UPLOAD"
                                        label="File Upload"
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    )}

                    {assignment && (
                        <Form.Group as={Row} className="mb-3 small" controlId="wd-assign">
                            <Form.Label column sm={4} className="text-end">
                                Assign
                            </Form.Label>
                            <Col sm={8}>
                                <div className="border rounded p-3">
                                    <Row>
                                        <Form.Label>
                                            <div className="fw-semibold mb-0">Assign to</div>
                                        </Form.Label>
                                        <Form.Control value={assignment.assignTo}/>
                                    </Row>
                                    <Row>
                                        <Form.Label>
                                            <div className="fw-semibold mb-0">Due</div>
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={new Date(assignment.due).toISOString().slice(0, 10)}
                                        />
                                    </Row>
                                    <Row>
                                        <Col sm={6}>
                                            <Form.Label>
                                                <div className="fw-semibold mb-0">Available from
                                                </div>
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={new Date(assignment.notAvailableUntil).toISOString().slice(0, 10)}
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Label>
                                                <div className="fw-semibold mb-0">Until</div>
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={new Date(assignment.notAvailableAfter).toISOString().slice(0, 10)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Form.Group>
                    )}
                </Form>
            </Col>
            <hr className="my-4"/>

            <div className="d-flex justify-content-end">
                <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                    <button className="btn btn-outline-secondary">Cancel</button>
                    <button className="btn btn-danger">Save</button>
                </Link>
            </div>
        </div>
    );
}
