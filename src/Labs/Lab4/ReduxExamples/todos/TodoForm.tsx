import {Button, FormControl, ListGroup} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm(
) {

    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <ListGroup.Item className="d-flex justify-content-between mb-2">
            <FormControl value={todo.title}
                         onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
            <Button onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click" className="btn btn-warning"> Update </Button>
            <Button onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click" className="btn btn-success"> Add </Button>
        </ListGroup.Item>
    );}
