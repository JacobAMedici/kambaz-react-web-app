import {Button, FormControl, Modal} from "react-bootstrap";
import {useParams} from "react-router";
import { useDispatch } from "react-redux";

export default function ModuleEditor({
                                         show,
                                         handleClose,
                                         dialogTitle,
                                         moduleName,
                                         setModuleName,
                                         addModule,
                                     }: {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    moduleName: string;
    setModuleName: (name: string) => void;
    addModule: () => void;
}) {
    const {cid} = useParams();
    const dispatch = useDispatch();
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl value={moduleName}
                             onChange={(e) => {
                                 setModuleName(e.target.value);
                             }}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                <Button variant="primary"
                        onClick={() => {
                            dispatch(addModule({ name: moduleName, course: cid }));
                            handleClose();
                        }}> Add Module </Button>
            </Modal.Footer>
        </Modal>
    );
}
