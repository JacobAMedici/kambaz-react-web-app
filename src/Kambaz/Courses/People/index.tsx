import Users from "../../Account/Users.tsx";
import {useParams} from "react-router";

export default function People () {
    const {cid} = useParams();
    return (
        <div id="wd-people">
            <Users courseId={cid}/>
        </div>
    );}