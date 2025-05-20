import { Link } from "react-router-dom";
import {Form} from "react-bootstrap";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <Form>
                <Form.Group className="mb-3" controlId="wd-username">
                    <Form.Control type="text" placeholder="username" className="wd-username"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-password">
                    <Form.Control type="password" placeholder="password" className="wd-password"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-password-verify">
                    <Form.Control type="password" placeholder="verify password" className="wd-password"/>
                </Form.Group>
            </Form>
            <Link  to="/Kambaz/Account/Profile" >
                <button className="btn btn-primary w-100">
                    Sign up
                </button> </Link><br />
            <Link  to="/Kambaz/Account/Signin" >Sign in</Link>
        </div>
    );}
