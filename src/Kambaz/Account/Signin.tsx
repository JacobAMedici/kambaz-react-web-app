import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";

export default function Signin() {
    return (
        <div id="wd-signin-screen">
            <h3>Sign in</h3>
            <Form>
                <Form.Group className="mb-3" controlId="wd-username">
                    <Form.Control type="text" placeholder="username" className="wd-username"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-password">
                    <Form.Control type="password" placeholder="password" className="wd-password"/>
                </Form.Group>
            </Form>
            <Link id="wd-signin-btn" to="/Kambaz/Dashboard">
                <button className="btn btn-primary w-100">
                    Sign in
                </button>
            </Link> <br/>
            <Link to="/Kambaz/Account/Signup" id="wd-signup-link">Sign up</Link>
        </div>
    );
}
