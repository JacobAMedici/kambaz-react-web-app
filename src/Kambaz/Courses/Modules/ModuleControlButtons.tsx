import GreenCheckmark from "./GreenCheckmark.tsx";
import {IoEllipsisVertical} from "react-icons/io5";
import {FaPencil, FaPlus} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import {useSelector} from "react-redux";


export default function ModuleControlButtons({moduleId, deleteModule, editModule}: {
    moduleId: string; deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void
}) {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    return (
        <div className="float-end">
            {currentUser.role === "FACULTY" ? (
                <div id="wd-module-modifications">
                    <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3"/>
                    <FaTrash className="text-danger me-2 mb-1"
                             onClick={() => deleteModule(moduleId)}/>
                    <GreenCheckmark/>
                    <FaPlus/>
                    <IoEllipsisVertical className="fs-4"/>
                </div>
            ) : <div id="wd-module-modifications">
                <GreenCheckmark/>
                <IoEllipsisVertical className="fs-4"/>
            </div>}
        </div>
    );
}