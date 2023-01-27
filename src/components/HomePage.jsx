import {useContext, useEffect, useState} from "react";
import LoginContext from "../contexts/LoginContext";
import axios from "axios";
import Table from 'react-bootstrap/Table'
import {Link} from "react-router-dom";

const HomePage = () => {
    const loginContext = useContext(LoginContext);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if(loginContext.isLogged){
            axios.get(`http://localhost/php-react/read.php?user_id=${localStorage.getItem('user_id')}`)
                .then(response => {
                    setTodos(response.data)
                })
        }
        else{
            setTodos([]);
        }
    }, [loginContext.isLogged])

    return (
        <div className="container mt-5">
            {!loginContext.isLogged && <div>Zaloguj się aby utworzyć zadanie!</div>}
            {loginContext.isLogged &&  <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tytuł</th>
                    <th>Szczeguły</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo, index) => <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{todo.title}</td>
                    <td><Link to={`/todo/${todo.id}`}>Szczególy</Link></td>
                </tr>)}

                </tbody>
            </Table>}
        </div>
    )
}

export default HomePage