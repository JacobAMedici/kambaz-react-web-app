export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input placeholder="Search for Assignments"
                   id="wd-search-assignment" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button> </h3>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                       className="wd-assignment-link">
                        A1 - ENV + HTML <br/>
                    </a></li>
                    Multiple Modules | <b> Not available until </b> May 6th at 12:00 am | <b>Due </b>
                    May 13th at 11:59 pm | 100 pts
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                       className="wd-assignment-link">
                        A2 - CSS + BOOTSTRAP
                    </a></li>
                Multiple Modules | <b> Not available until </b> May 13th at 12:00 am | <b>Due </b>
                May 20th at 11:59 pm | 100 pts
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                       className="wd-assignment-link">
                        A3 - JAVASCRIPT + REACT
                    </a></li>
                Multiple Modules | <b> Not available until </b> May 20th at 12:00 am | <b>Due </b>
                May 27th at 11:59 pm | 100 pts
            </ul>
        </div>
    );
}
