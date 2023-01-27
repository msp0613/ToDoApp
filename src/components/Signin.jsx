import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import LoginContext from "../contexts/LoginContext";

const Signin = () => {
    const navigate = useNavigate();
    const loginContext = useContext(LoginContext);

    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    })
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validate}
            onSubmit={data => {
                console.log(data)

                let formData = new FormData();
                formData.append('email', data.email)
                formData.append('password', data.password)

                axios({
                    method: 'post',
                    url: 'http://localhost/php-react/signin.php/',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(function (response) {
                        loginContext.setIsLogged(true);
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('user_id', response.data.user_id);
                        navigate('/')
                        alert('User logged suceffuly!');
                    })

                    .catch(function (response) {
                        console.log(response);
                        alert('User not exist!')
                    });

            }}>

            {formik => (
                <div className="container">
                    <h1 className="my-4 font-weight-bold .display-4">Logowanie</h1>
                    <Form>
                        <TextField label="Email" name="email" type="email" />
                        <TextField label="Password" name="password" type="password" />
                        <button className="btn btn-primary mt-3" type="submit" style={{marginRight: 20}}>Zaloguj się</button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export default Signin;