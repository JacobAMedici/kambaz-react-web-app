import {Link} from "react-router-dom";
import { useSelector } from "react-redux"
import {useLocation} from "react-router";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { pathname } = useLocation();
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const active = (path: string) => (pathname.includes(path) ? "active" : "");

    // I had ChatGPT generate this part of the code because I wasn't sure how to incorporate what we
    // had to add in the class
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link}
                    to={`/Kambaz/Account/${link}`}
                    className={`list-group-item ${active(link)} border border-0`}
                >
                    {link}
                </Link>
            ))}

            {/* Note, I changed this to make it FACULTY can also view this */}
            {currentUser && (currentUser.role === "ADMIN") && (
                <Link
                    to={`/Kambaz/Account/Users`}
                    className={`list-group-item ${active("Users")} border border-0`}
                >
                    Users
                </Link>
            )}
        </div>
    );
}

