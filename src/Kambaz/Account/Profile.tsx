import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";

export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <Form>
                <Form.Group className="mb-3" controlId="wd-username">
                    <Form.Control
                        type="text"
                        placeholder="username"
                        value="alice"
                        className="wd-username"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-password">
                    <Form.Control
                        type="password"
                        placeholder="password"
                        value="123"
                        className="wd-password"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-firstname">
                    <Form.Control type="text" placeholder="First Name" value="Alice"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-lastname">
                    <Form.Control type="text" placeholder="Last Name" value="Wonderland"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-dob">
                    <Form.Control type="date" defaultValue="2000-01-01"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-email">
                    <Form.Control type="email" placeholder="Email" value="alice@wonderland"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-role">
                    <Form.Select defaultValue="FACULTY">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </Form.Select>
                </Form.Group>
            </Form>
            <Link to="/Kambaz/Account/Signin">
                <button className="btn btn-danger w-100">
                    Signout
                </button>
            </Link>
        </div>
    );
}
