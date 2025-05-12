export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><b>Assignment Name </b><br/><br/></label>
            <input id="wd-name" value="A1 - ENV + HTML"/><br/><br/>
            <textarea id="wd-description">
                For A1, you will...
            </textarea>
            <br/>

            <br/>
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                <br/>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </td>
                </tr>
                <br/>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="LETTER">Letter</option>
                            <option value="HIDDEN">Hidden</option>
                        </select>
                    </td>
                </tr>
                <br/>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="ONLINE">Online</option>
                            <option value="PAPER">Paper</option>
                            <option value="NONE">None</option>
                        </select>
                    </td>
                </tr>
                <br/>

                <tr>
                    <td align="right" valign="top">

                    </td>
                    <td>
                        Online Entry Options<br/>
                        <input type="checkbox" id="wd-text-entry" value="TEXT_ENTRY"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>

                        <input type="checkbox" id="wd-website-url" value="WEBSITE_URL"/>
                        <label htmlFor="wd-website-url">Website URL</label><br/>

                        <input type="checkbox" id="wd-media-recording" value="MEDIA_RECORDING"/>
                        <label htmlFor="wd-media-recording">Media Recording</label><br/>

                        <input type="checkbox" id="wd-student-annotation"
                               value="STUDENT_ANNOTATION"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                        <input type="checkbox" id="wd-file-upload" value="FILE_UPLOAD"/>
                        <label htmlFor="wd-file-upload">File Upload</label><br/>
                    </td>
                </tr>
                <br/>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label>
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign to <br/></label>
                        <input id="wd-assign-to" value="Everybody" type="text"/>
                    </td>
                </tr>
                <br/>

                <tr>
                    <td align="right" valign="top">
                    </td>
                    <td>
                        <label htmlFor="wd-due-date">Due</label> <br/>
                        <input id="wd-due-date" type="date" value="2025-01-01"/>
                    </td>
                </tr>
                <br/>

                <tr>
                    <td align="right" valign="top">
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <label htmlFor="wd-available-from">Available from</label>
                                </td>
                                <td>
                                    <label htmlFor="wd-available-until">Until</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input id="wd-available-from" type="date" value="2025-01-01"/>
                                </td>
                                <td>
                                    <input id="wd-available-until" type="date" value="2025-01-01"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    );
}
