import {Button, ListGroup} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteTodo, setTodo} from "./todosReducer";

export default function TodoItem({ todo }: { todo: any }) {

    const dispatch = useDispatch();
    return (
        // I took the suggestion to use mb-2 for alignment from ChatGPT
        <ListGroup.Item key={todo.id} className="d-flex justify-content-between mb-2">
            {todo.title}
            <div>
                <Button onClick={() => dispatch(setTodo(todo))}
                        id="wd-set-todo-click"> Edit </Button>
                <Button onClick={() => dispatch(deleteTodo(todo.id))}
                        id="wd-delete-todo-click" className="btn btn-danger"> Delete </Button>
            </div>
        </ListGroup.Item>);
}