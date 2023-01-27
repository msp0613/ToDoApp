import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';

const Single = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [todo, setTodo] = useState({});

    const deleteTodo = () => {
        axios.delete(`http://localhost/php-react/delete.php?user_id=${localStorage.getItem('user_id')}&todo_id=${params.id}`)
            .then(response => {
                navigate("/")
            })
    }

    useEffect(() => {
        axios.get(`http://localhost/php-react/read-single.php?user_id=${localStorage.getItem('user_id')}&todo_id=${params.id}`)
            .then(response => {
                setTodo(response.data)
            })
    }, [])

    return (
        <div className="container mt-5">
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <small>{new Date(todo.created_at).toLocaleString()}</small>
            <div className="mt-3">
                <Button variant="danger" onClick={deleteTodo}>Usuń</Button>
            </div>
        </div>
    )
}

export default Single;